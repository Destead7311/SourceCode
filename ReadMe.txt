Requirements: 


Windows pc (P.S. It is not compatible with MAC for now) 
Microsoft IIS enabled
Follow the steps provided in the link. https://www.howtogeek.com/112455/how-to-install-iis-8-on-windows-8/

Microsoft SQL Server Management studio installed. Download it from here: https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms



Setup your environment

Part1
Publish the website in the IIS: Internet Information Services 7.5 is used but it works on any version

1. Extract Destead.zip file
2. Copy ZKP_Destead to your drive
3. Open IIS manager
4. Right-click the site, and click Add Application
5. Type the Alias 'ZKP' -- extension will use it to communicate with the server
        using the floowing link http://localhost/ZKP
6. Assign an application pool
7. type the physical path of the application's folder 
        e.g C:\ZKP_Destead

Please go through the below link for further details if you have any issue with publishing the website in IIS.
https://technet.microsoft.com/en-us/library/cc772042(v=ws.10).aspx
--------------------------------------------------------------------

Part 2:
Connect to SQL DB: SQL server 2008 is used but it works on any version

1. Create Destead database:
    Option1: 
        1. Create a database named 'Destead' from SQL Server Management Studio or by command.
                Please note that name is not mandatory to be Destead, but you should change the web.config to point to your DB
        2. Run DB.sql file in order to create the needed Tables/Procedures

    Option2:
        1. Restore the backup of the DB from the given DB\Destead.bak file.
    Please go through the below link for further details:
    https://docs.microsoft.com/en-us/sql/relational-databases/databases/create-a-database

    2. Go to Web.config:  
       Change ConnectionString key to put your credentials that you used when you created the DB
       




Part3
Chrome Extension:


Open Chrome. Go to settings -> extensions. Turn on the developer mode.
Drag the setup file ( ChromeExtension.crx) to this window. The extension will be installed. 
You can now login and register using this plugin. 




How to test (without extenstion):


Browse you website which created in part1 of Setup your Environment
Login Page will be opened by default
Click on Register to open the registration page
Enter your details, then click Register
A message will appear if you have successfully registered in the system
Click on Login to go to the login page
Try to validate you athentication
A message box will be displayed to inform you whether the Login has been successful or not.