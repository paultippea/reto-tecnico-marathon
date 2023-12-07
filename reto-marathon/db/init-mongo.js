db.createUser({
    user: "root",
    pwd: "password",
    roles: [
        {
            role: "readWrite",
            db: "marathondb"
        }
    ]
});

db.sch_users.insert({
    "username": "ptippeacevedo",
    "name": "paul",
    "lastname": "tippe acevedo",
    "email": "paul1@gmail.com",
    "password": "$2b$10$x8uLfQCZEDCGYzJWb20ZT.V8178b5N/vtRmOQMdVhxQyEPqtt/syi"
});