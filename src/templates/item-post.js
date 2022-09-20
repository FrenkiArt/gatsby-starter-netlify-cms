import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

// eslint-disable-next-line
export const ItemPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  image,
  id,
}) => {
  const ItemContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h3>id = {id}</h3>
            <h3>А вот это видимо и есть страница одной штуки ))</h3>
            <hr />
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <p>Акция ли? {}</p>
            <p>
              {image ? (
                <div className="featured-thumbnail">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: image,
                      alt: `  ${title}`,
                      width: image.childImageSharp.gatsbyImageData.width,
                      height: image.childImageSharp.gatsbyImageData.height,
                    }}
                  />
                </div>
              ) : null}
            </p>

            <ItemContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

ItemPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const ItemPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ItemPostTemplate
        content={post.html}
        id={post.id}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        image={post.frontmatter.image}
      />
    </Layout>
  );
};

ItemPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ItemPost;

export const pageQuery = graphql`
  query ItemPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image {
          childImageSharp {
            gatsbyImageData(width: 300, quality: 100, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;
