import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class ItemRollTemplate extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <article
                className={`blog-list-item tile is-child box notification ${
                  post.frontmatter.featuredpost ? "is-featured" : ""
                }`}
              >
                <header>
                  {post.frontmatter.image ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.image,
                          alt: `image image thumbnail for post ${post.frontmatter.title}`,
                          width:
                            post.frontmatter.image.childImageSharp
                              .gatsbyImageData.width,
                          height:
                            post.frontmatter.image.childImageSharp
                              .gatsbyImageData.height,
                        }}
                      />
                    </div>
                  ) : null}
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <span className="subtitle is-size-5 is-block">
                      akcia? {post.frontmatter.akcia}
                    </span>
                  </p>
                </header>
                <p>
                  {post.excerpt}
                  <br />
                  {post.frontmatter.description}
                  <br />
                  <ul className="taglist">
                    {post.frontmatter.tags.map((tag) => (
                      <li key={tag + `tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    Подробнее →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    );
  }
}

ItemRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default function ItemRoll() {
  return (
    <StaticQuery
      query={graphql`
        query ItemRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "item-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  image {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )
                    }
                  }
                  description
                  tags
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <ItemRollTemplate data={data} count={count} />}
    />
  );
}
