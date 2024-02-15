CREATE OR ALTER PROCEDURE completeProject(@project_id VARCHAR(100), @user_id VARCHAR(100))
AS
BEGIN
    UPDATE Projects SET isCompleted = 1 WHERE project_id = @project_id;

    UPDATE Users SET isAssigned = 0 WHERE user_id = @user_id;
END