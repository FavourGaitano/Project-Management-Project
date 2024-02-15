CREATE PROCEDURE createProject(
        @project_id VARCHAR(100), 
        @projectname VARCHAR(200),
        @description VARCHAR(255),
        @createdate VARCHAR(20),
        @enddate VARCHAR(200)
        

    )
AS
BEGIN
    INSERT INTO Projects(project_id, projectname, description, createdate, enddate)
    VALUES(@project_id, @projectname, @description, @createdate, @enddate)
END