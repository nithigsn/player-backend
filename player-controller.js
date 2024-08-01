const PlayerModel = require('./player-model');

// Controller Logics Below

async function signUp(req, res) {
    try {
        const { name, email, username, password } = req.body;



        const newUser = await PlayerModel.create({
            name,
            email,
            username,
            password
        });

        res.status(201).json({
            status: true,
            msg: "User created successfully",
            data: {
                id: newUser._id
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Error',
            data: error.message // Send only the error message
        });
    }
}

async function signIn(req, res) {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await PlayerModel.findOne({ username });

        // If user is not found
        if (!user) {
            return res.status(400).json({
                status: false,
                msg: 'Username or password is incorrect'
            });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                status: false,
                msg: 'Username or password is incorrect'
            });
        }

        // If everything is correct
        res.json({
            status: true,
            msg: 'Sign in successful',
            data: {
                id: user._id,
                username: user.username,
                // Add more user details if needed
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Error',
            data: error.message
        });
    }
}

// CRUD: Create/Update Playlist
async function playList(req, res) {
    try {
        const { _id, playlistname } = req.body;

        // Add a new playlist to the specified player's playlists array
        const result = await PlayerModel.updateOne(
            { _id },
            { $push: { playlists: { playlistname, songs: [] } } }
        );

        res.json({
            status: result.modifiedCount === 1,
            msg: result.modifiedCount === 1 ? "Success" : "Failed"
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Error',
            data: error.message
        });
    }
}

// CRUD: Read User Details
async function userDetails(req, res) {
    try {
        const { id } = req.params;

        // Find the player with the given id
        const result = await PlayerModel.findById(id);

        if (!result) {
            return res.status(404).json({
                status: false,
                msg: "User not found"
            });
        }

        res.json({
            status: true,
            msg: "User found",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Error',
            data: error.message
        });
    }
}

// CRUD: Update User Details
async function updateDetails(req, res) {
    try {
        const { _id, about } = req.body;

        // Update the about field of the specified player's document
        const result = await PlayerModel.updateOne(
            { _id },
            { $set: { about } }
        );
        
        res.json({
            status: result.modifiedCount === 1,
            msg: result.modifiedCount === 1 ? "Success" : "Failed"
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: "Error",
            data: error.message
        });
    }
}

module.exports = { signUp, signIn, playList, userDetails, updateDetails };
