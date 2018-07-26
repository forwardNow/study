module.exports = {
    plugins: [
        require("autoprefixer")({
            // 参考: https://github.com/browserslist/browserslist#best-practices
            browsers: [
                // 加这个后可以出现额外的兼容性前缀
                "> 0.01%",
                "not ie <= 8"
            ]
        })
    ]
}