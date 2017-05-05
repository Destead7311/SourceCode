using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Numerics;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Destead;

public partial class Account_Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
     
    }

    /*
     * Input from the Client
     * 
     * VerifierState0 (encryptedData, username)
     * 
     * Output is VerifierDetails
     * 
     * Send back the VerifierDetails to the client
     * 
    */
    [WebMethod(EnableSession = true)]
    [ScriptMethod(UseHttpGet = true)]
    public static VerifierDetails VerifierState0(object encryptedData, object userName)
    {
        VerifierDetails verifier = new VerifierDetails();
        var G = HttpContext.Current.Session["G"].ToString();
        var P = HttpContext.Current.Session["P"].ToString();
        var UserKey = HttpContext.Current.Session["UserKey"].ToString();
        var InitialValue = "7583945720389475";

        UTF8Encoding utf8 = new UTF8Encoding();

        string gx = "";
        gx = CryptoHelper.DecryptStringFromBytes(Convert.FromBase64String(encryptedData.ToString()), utf8.GetBytes(UserKey), utf8.GetBytes(InitialValue));
        BigInteger y = Helper.GetRandomInteger();
        BigInteger gy = BigInteger.ModPow(BigInteger.Parse(G), y, BigInteger.Parse(P));
        BigInteger gxy = BigInteger.ModPow(BigInteger.Parse(gx), y, BigInteger.Parse(P));


        string sessionKey = string.Format("{0}{1}{2}", gx, gy, gxy);

        HttpContext.Current.Session["Key"] = sessionKey;

        verifier.AuthVerifier = CryptoHelper.Hash(string.Format("{0}{1}", sessionKey, HttpContext.Current.Session["IterationCount"].ToString()));
        verifier.EncryptedGy = Convert.ToBase64String(CryptoHelper.EncryptStringToBytes(gy.ToString(), utf8.GetBytes(UserKey), utf8.GetBytes(InitialValue)));
        return verifier;
    }

    /*
     * Input from the Client
     * 
     * hasedData = sessionkey || iteration count + 1
     * 
     * VerifierState1 (hashedData) 
     * 
     * Output is boolean value
     * 
     * Send back the boolean value to the client whether authenticated or not
     * 
    */

    [WebMethod(EnableSession = true)]
    [ScriptMethod(UseHttpGet = true)]
    public static bool VerifierState1(string hashedData)
    {
        string sessionKey = HttpContext.Current.Session["key"].ToString();
        bool rtn = hashedData == CryptoHelper.Hash(string.Format("{0}{1}", sessionKey, int.Parse(HttpContext.Current.Session["IterationCount"].ToString()) + 1));
        return rtn;

    }

    /*
     * Input from the Client
     * 
     * 
     * 
     * GetUserDetails (username) 
     * 
     * Output is UserDetails
     * 
     * Send back the user details to the client without user key 
     * 
     * Save user details in the IIS session accessible only by the server
     * 
    */
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static UserDetails GetUserDetails(object username)
    {
         UserDetails user = new UserDetails();
        
        string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
        using (SqlConnection conn = new SqlConnection(connectionString))
        {

            string query = "SELECT * FROM [User] WHERE UserName = @UserName";

            using (SqlCommand cmd = new SqlCommand(query))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.Parameters.AddWithValue("@Username", username);
                    cmd.Connection = conn;
                    conn.Open();
                    SqlDataReader sqlReader = cmd.ExecuteReader();
                    if (sqlReader.HasRows)
                    {
                       
                        while (sqlReader.Read())
                        {
                            user.UserName = sqlReader["UserName"].ToString();
                            user.P = sqlReader["P"].ToString();
                            user.G = sqlReader["G"].ToString();
                            user.IterationCount = int.Parse(sqlReader["IterationCount"].ToString());
                            user.Salt = sqlReader["Salt"].ToString();
                            //Save in IIS session for server usage
                            HttpContext.Current.Session["P"] = sqlReader["P"].ToString();
                            HttpContext.Current.Session["G"] = sqlReader["G"].ToString();
                            HttpContext.Current.Session["IterationCount"] = sqlReader["IterationCount"].ToString();
                            //only available to server, will not be sending to the client
                            HttpContext.Current.Session["UserKey"] = sqlReader["UserKey"].ToString();
                        }
                    }
                    conn.Close();
                }
            }

            return user;
        }

    }
}