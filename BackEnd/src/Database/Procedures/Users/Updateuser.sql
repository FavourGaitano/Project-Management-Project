CREATE PROCEDURE updateUser(
    @user_id VARCHAR(100),
    @name VARCHAR(200), 
    @email VARCHAR(200),  
    @role VARCHAR(20), 
    @password VARCHAR(100), 
    @specialization_area VARCHAR(200))
AS
BEGIN
    UPDATE Users SET 
        name=@name, 
        email=@email, 
        role=@role, 
        password=@password, 
        specialization_area=@specialization_area
    WHERE user_id = @user_id
END