import {
  type ArticleProps,
  Article as RHCArticle,
} from "@rijkshuisstijl-community/article-react/no-side-effects";

const Article = (props: ArticleProps) => {
  return <RHCArticle {...props} />;
};

export default Article;
