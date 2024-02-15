CREATE OR ALTER PROCEDURE assignUser(
    @project_id VARCHAR(250),
    @user_id VARCHAR(250)
    
)
AS
BEGIN
    UPDATE Projects SET 
    user_id = @user_id
    WHERE project_id=@project_id;

    

    -- UPDATE Users SET isAssigned = 1 WHERE user_id = @user_id;
END;

-- CREATE OR ALTER PROCEDURE checkUser (@user_id VARCHAR(100))
-- AS
-- BEGIN
--     SELECT * FROM Users WHERE User_id = @user_id
-- END

-- SELECT * FROM Users