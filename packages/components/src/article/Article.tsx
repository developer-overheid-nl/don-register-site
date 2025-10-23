import {
  type ArticleProps,
  Article as RHCArticle,
} from "@rijkshuisstijl-community/components-react";

const Article = (props: ArticleProps) => {
  return <RHCArticle {...props} />;
};

export default Article;
