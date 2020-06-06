import React from 'react';
import { Box } from '@chakra-ui/core';
import { PostModel } from '../models/PostModel';

type Props = {
  post: PostModel;
};

const Post: React.FC<Props> = ({ post }) => {
  return (
    <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
        p="4"
      >
        {post.published_date_yyyymmdd}
      </Box>
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {post.title}
      </Box>
      <Box>{post.text}</Box>
    </Box>
  );
};

export default Post;
