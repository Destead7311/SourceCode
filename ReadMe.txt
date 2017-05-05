
Setup your environment

	Part1
	Publish the website in the IIS: Internet Information Services 7.5 is used but it works on any version
        
	1. Extract Destead.zip file
	2. Copy ZKP_Destead to your drive
   	3. Open IIS manager
   	4. Right-click the site, and click Add Application
   	5. Type the Alias you want such as 'ZKP'
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
           e.g: 
 <add name="ConnectionString" connectionString="Data Source=.\HELALMSSQL;Initial Catalog=Destead;User id =destead;password=Destead@123"/>


 ------------------------------------------------------------------------------------------
How to Use:

1. Browse you website which created in part1 of Setup your Environment
2. Login Page will be opened by default
3. Click on Register to open the registration page
4. Enter your details, then click Register
5. A message will appear if you have successfully registered in the system
6. Click on Login to go to the login page
7. Try to validate you athentication
8. A message box will be displayed to inform you whether the Login has been successful or not.



