const { catchAsync } = require("../utils/catchAsync");

exports.commentExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findOne({
    where: { id, status: "active" },
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password"]
        }
      },
      { model: Post }
    ]
  });

  if (!comment) {
    return next(new AppError(404, "No comments found for this reuqest"));
  }

  req.comment = comment;

  next();
});
