<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Register.aspx.cs" Inherits="Account_Register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>   
    <script type="text/javascript" src="../Scripts/Account/register.js"></script>
    <script type="text/javascript" src="../Scripts/Crypto/pkdf2.js"></script>
    <script type="text/javascript" src="../Scripts/Crypto/sha1.js"></script>
    <link rel="stylesheet" href="../Content/Site.css" />
</head>
<body>
    <form id="form1" runat="server">
  <div class="container body-content">
         <asp:HiddenField ID="UserKey" runat="server" Value=""></asp:HiddenField>
    <h2><%: Title %>.</h2>
    <p class="text-danger">
        <asp:Literal runat="server" ID="ErrorMessage" />
    </p>    
    <p>
       <asp:HyperLink NavigateUrl="~/Account/Login.aspx" runat="server" ID="RegisterHyperLink" ViewStateMode="Disabled">Login</asp:HyperLink>
                   Click to go back to Login Page
    </p>
    <div class="form-horizontal">
        <h4>Create a new account.</h4>
        <hr />
        <asp:ValidationSummary runat="server" CssClass="text-danger" />
        <div class="form-group">
            <asp:Label runat="server" AssociatedControlID="UserName" CssClass="col-md-2 control-label">User name</asp:Label>
            <div class="col-md-10">
                <asp:TextBox runat="server" ID="UserName" CssClass="form-control" />
                <asp:RequiredFieldValidator runat="server" ControlToValidate="UserName"
                    CssClass="text-danger" ErrorMessage="The user name field is required." />
                <asp:RegularExpressionValidator Display = "Dynamic" ControlToValidate = "UserName" ID="RegularExpressionValidator1" ValidationExpression = "^[\s\S]{6,}$" runat="server" ErrorMessage="Minimum 6 characters required."></asp:RegularExpressionValidator>
            </div>
        </div>
        <div class="form-group">
            <asp:Label runat="server" AssociatedControlID="Password" CssClass="col-md-2 control-label">Password</asp:Label>
            <div class="col-md-10">
                <asp:TextBox runat="server" ID="Password" TextMode="Password" CssClass="form-control" />
                <asp:RequiredFieldValidator runat="server" ControlToValidate="Password"
                    CssClass="text-danger" ErrorMessage="The password field is required." />
                <asp:RegularExpressionValidator Display = "Dynamic" ControlToValidate = "Password" ID="RegularExpressionValidator2" ValidationExpression = "^[\s\S]{6,}$" runat="server" ErrorMessage="Minimum 6 characters required."></asp:RegularExpressionValidator>
            </div>
        </div>
        <div class="form-group">
            <asp:Label runat="server" AssociatedControlID="ConfirmPassword" CssClass="col-md-2 control-label">Confirm password</asp:Label>
            <div class="col-md-10">
                <asp:TextBox runat="server" ID="ConfirmPassword" TextMode="Password" CssClass="form-control" />
                <asp:RequiredFieldValidator runat="server" ControlToValidate="ConfirmPassword"
                    CssClass="text-danger" Display="Dynamic" ErrorMessage="The confirm password field is required." />
                <asp:CompareValidator runat="server" ControlToCompare="Password" ControlToValidate="ConfirmPassword"
                    CssClass="text-danger" Display="Dynamic" ErrorMessage="The password and confirmation password do not match." /> 
            </div>
        </div>
        <div class="form-group">
            <asp:Label runat="server" AssociatedControlID="Salt" CssClass="col-md-2 control-label">Salt</asp:Label>
            <div class="col-md-10">
                <asp:TextBox runat="server" ID="Salt" CssClass="form-control" />
                <asp:RequiredFieldValidator runat="server" ControlToValidate="Salt"
                    CssClass="text-danger" ErrorMessage="The Salt field is required." />
            </div>
        </div>
        <div class="form-group">
            <asp:Label runat="server" AssociatedControlID="IterationCount" CssClass="col-md-2 control-label">Iteration Count</asp:Label>
            <div class="col-md-10">
                <asp:TextBox runat="server" ID="IterationCount" CssClass="form-control" />
                <asp:RequiredFieldValidator runat="server" ControlToValidate="IterationCount"
                    CssClass="text-danger" ErrorMessage="The Iteration Count field is required." />
                <asp:RangeValidator runat="server" Type="Integer" MinimumValue="1" MaximumValue="500" ControlToValidate="IterationCount" 
                    ErrorMessage="Value must be integer between 1 and 500" />
            </div>
        </div>
        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <div hidden><asp:Button ID="reg" runat="server" OnClick="CreateUser_Click" Text="Register" CssClass="btn btn-default" PostBackUrl="~/Account/Register.aspx" />
                </div>
                    <button id="btnRegister">Register</button>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
