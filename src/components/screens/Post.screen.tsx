import React from 'react';
import { gql } from 'apollo-boost';
import { ScrollView, View } from 'react-native';
import { Text } from '../elements';
import { Helmet } from '../lib/Helmet';
import { useRouter } from '../lib/Routing';
import { useQuery } from '../../mockApi/hooks/useQuery';
import { PostType } from '../../model/posts/type';
import { NotFoundScreen } from './NotFound.screen';

const POST = gql`
  query($slug: string) {
    post(where: { slug: $slug }) {
      id
      title
      userId
      title
      slug
      body
      hasFeaturedImage
    }
  }
`;

export const PostScreen = () => {
  const { match } = useRouter();
  const postQuery = useQuery<PostType>(POST, {
    variables: { slug: match.params.slug },
    pollInterval: 3000
  });

  if (postQuery.error.message || postQuery.error.graphQLErrors.length) {
    console.dir(postQuery.error);
    return <NotFoundScreen />;
  }

  if (postQuery.loading || !postQuery.data.title) return <></>;

  return (
    <>
      <Helmet title={postQuery.data.title} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: 60,
            paddingHorizontal: 30
          }}
        >
          <Text h1>{postQuery.data.title}</Text>
          <Text>{postQuery.data.body}</Text>
        </View>
      </ScrollView>
    </>
  );
};
