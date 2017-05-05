using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Services;
using Destead;
using System.Web.Script.Services;


public partial class Account_Register : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    /*
     * 
     * Register the user information after the client submit the forms data
     * 
     * 
     * CreateUser_Click (sender, e) 
     * 
     * Save user details to the SQL DB
     * 
    */

    protected void CreateUser_Click(object sender, EventArgs e)
    {
        int userId = 0;

        string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
        using (SqlConnection conn = new SqlConnection(connectionString))
        {
            using (SqlCommand cmd = new SqlCommand("Insert_User"))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Username", UserName.Text.Trim());
                    cmd.Parameters.AddWithValue("@P", Helper.GetPrime().ToString());
                    cmd.Parameters.AddWithValue("@G", Helper.GetRandomInteger().ToString());
                    cmd.Parameters.AddWithValue("@UserKey", UserKey.Value);
                    cmd.Parameters.AddWithValue("@Salt", Salt.Text.ToString());
                    cmd.Parameters.AddWithValue("@IterationCount", int.Parse(IterationCount.Text));
                    cmd.Connection = conn;
                    conn.Open();
                    userId = Convert.ToInt32(cmd.ExecuteScalar());
                    conn.Close();
                }
            }
            string message = string.Empty;
            switch (userId)
            {
                case -1:
                    message = "Username already exists.\\n \\n Please choose a different username.";
                    break;
                default:
                    message = "Registered successfully";
                    break;
            }

            ErrorMessage.Text =  message;
        }
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]

    public static string SaveUserDetails(object UserName, object UserKey, object Salt, object IterationCount)
    {
        int userId = 0;

        string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
        using (SqlConnection conn = new SqlConnection(connectionString))
        {
            using (SqlCommand cmd = new SqlCommand("Insert_User"))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Username", UserName.ToString().Trim());
                    cmd.Parameters.AddWithValue("@P", Helper.GetPrime().ToString());
                    cmd.Parameters.AddWithValue("@G", Helper.GetRandomInteger().ToString());
                    cmd.Parameters.AddWithValue("@UserKey", UserKey.ToString());
                    cmd.Parameters.AddWithValue("@Salt", Salt.ToString());
                    cmd.Parameters.AddWithValue("@IterationCount", int.Parse(IterationCount.ToString()));
                    cmd.Connection = conn;
                    conn.Open();
                    userId = Convert.ToInt32(cmd.ExecuteScalar());
                    conn.Close();
                }
            }
            string message = string.Empty;
            switch (userId)
            {
                case -1:
                    message = "Username already exists. Please choose a different username.";
                    break;
                default:
                    message = "Registered successfully, Welcome to the system: " + UserName.ToString();
                    break;
            }

           return message;
        }
    }

}