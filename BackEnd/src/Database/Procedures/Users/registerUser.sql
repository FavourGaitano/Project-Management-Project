CREATE OR ALTER PROCEDURE registerUser(
        @user_id VARCHAR(100), 
        @name VARCHAR(200),
        @email VARCHAR(255),
        @role VARCHAR(20),
        @password VARCHAR(200),
        @specialization_area VARCHAR(200)

    )
AS
BEGIN
    INSERT INTO Users(User_id, Name, Email, Role, Password, Specialization_area)
    VALUES(@user_id, @name, @email, @role, @password, @specialization_area)
END

SELECT * FROM Users