CREATE PROCEDURE updateProject(

        @project_id VARCHAR(100), 
        @projectname VARCHAR(200),
        @description VARCHAR(255),
        @createdate VARCHAR(20),
        @enddate VARCHAR(200)


    )
AS
BEGIN
    UPDATE Projects SET 
        projectname=@projectname, 
        description=@description, 
        createdate=@createdate, 
        enddate =@enddate    
    WHERE project_id =@project_id
END