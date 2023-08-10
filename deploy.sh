# 1 构建
vuepress build docs
# 2 导航到构建输出目录

cd dcos/.vuepress/dist

git init 
git add -A
git commit  -m 'deploy'

# 推到仓库 的gh-pages 分支
# 将 username/pero 替换为你的信息

git push -f git@github.com:qscaler/docs.git master:gh-pages