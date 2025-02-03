const user = await User.findByPk(userId, {
      include: [{ model: Post, as: "posts" }],
    });
// user relation

User.hasMany(Post, { foreignKey: "userId", as: "posts" });

// post relation

Post.belongsTo(User, { foreignKey: "userId", as: "user" });
