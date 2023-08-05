const userData = async (req, res, next) => {
    res.json({user : req.user , token : req.cookies});
};

export default userData;