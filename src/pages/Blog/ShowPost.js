// import React, { Component } from "react";
// import { Mutation, ApolloConsumer, Query } from "react-apollo";
// import { gql } from "apollo-boost";

// const UPLOAD_BLOG_IMAGE = gql`
//   mutation UploadFile($file: Upload!, $id: ID!) {
//     uploadImage(file: $file, blogId: $id)
//   }
// `;

// const BLOG_POSTS = gql`
//   query Posts {
//     blogs {
//       id
//       title
//       category
//       type
//       status
//       image
//       date
//       path
//       description
//       metaTitle
//       metaDescription
//     }
//   }
// `;

// class AddPost extends Component {
//   state = {};
//   render() {
//     return (
//       <div>
//         <div>add post</div>
//         <Query query={BLOG_POSTS}>
//           {({ loading, data, error }) => {
//             if (loading) {
//               return <h4>Loading...</h4>;
//             }
//             if (error) {
//               return <h4>Error</h4>;
//             }
//             return <div>{JSON.stringify(data, null, 2)}</div>;
//           }}
//         </Query>
//         {/* <Mutation>

//           </Mutation> */}
//       </div>
//     );
//   }
// }

// export default AddPost;
