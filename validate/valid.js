function createPostValidator(req,res,next){

    req.check("title","Write a title").notEmpty();
    req.check("title" , "Title must be between 2 and 150 characters").isLength({
        min:2,
        max:150
    });

    req.check('body',"Write a post").notEmpty();
    req.check('body' , "Post must be between 2 and 2000 characters").isLength({
        min:2,
        max:150
    });

    const errors = req.validationErrors();

    if(errors){
        const firstErr = errors.map((error) =>error.msg)[0];
        return res.status(400).json({
            error:firstErr
        });
    }

    next();
}

function userSignupValidator(req,res,next){

    //name between 3 and 12 letters
    req.check('name' , "Name required").notEmpty();
    req.check('name', "Name must be between 3 and 12 characters").isLength({
        min:3,
        max:12
    });

    //email is not null and is actual email
    req.check('email' , 'Email must be between 3 and 40 characters').matches(/.+\@.+\..+/)
        .withMessage('Provide valid email address')
        .isLength({
            min:3,
            max:40
        });

    //password check

    req.check('password','Password required').notEmpty();
    req.check('password', 'Password must have between 8 and 40 characters and have a number')
        .isLength({
            min:8,
            max:40
        })
        .matches(/\d/)

    const errors = req.validationErrors();

    if(errors){
        const firstErr = errors.map((error) =>error.msg)[0];
        return res.status(400).json({
            error:firstErr
        });
    }

    next();
}

module.exports={
    createPostValidator,
    userSignupValidator
};