USE [Destead]
GO

/****** Object:  Table [dbo].[User]    Script Date: 05/03/2017 20:18:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserKey] [nvarchar](max) NOT NULL,
	[G] [nvarchar](max) NOT NULL,
	[P] [nvarchar](max) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[CreatedDateTime] [datetime] NOT NULL,
	[Salt] [nvarchar](max) NULL,
	[IterationCount] [int] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO











USE [Destead]
GO
/****** Object:  StoredProcedure [dbo].[Insert_User]    Script Date: 04/29/2017 11:00:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Insert_User]
	@Username NVARCHAR(50),
	@UserKey NVARCHAR(max),
	@G NVARCHAR(max),
	@P NVARCHAR(max),
	@IterationCount NVARCHAR(max),
	@Salt NVARCHAR(max)
AS
BEGIN
	SET NOCOUNT ON;
	IF EXISTS(SELECT UserId FROM dbo.[User] WHERE Username = @Username)
	BEGIN
		SELECT -1 -- Username exists.
	END
	ELSE
	BEGIN
		INSERT INTO [User]
			   ([Username]
			   ,[UserKey]
			   ,[G]
			   ,[P]
			   ,[CreatedDateTime]
               ,[IterationCount]
			   ,[Salt])
		VALUES
			   (@Username
			   ,@UserKey
			   ,@G
			   ,@P
			   ,SYSDATETIME()
			   ,@IterationCount
			   ,@Salt)
		
		SELECT SCOPE_IDENTITY() -- UserId			   
     END
END