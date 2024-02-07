CREATE OR ALTER PROCEDURE createUser(
    @user_id VARCHAR(255),
    @name VARCHAR(255),
    @email VARCHAR(255),
    @description VARCHAR(MAX),
    @registered_user VARCHAR(255)
    )
AS
BEGIN
    INSERT INTO Users(user_id, name, email, description, registered_user)
    VALUES(@user_id, @name, @email, @description, @registered_user)
END

SELECT * FROM Users