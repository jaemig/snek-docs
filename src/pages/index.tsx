import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import AppLayout from '../layout/AppLayout';

const IndexPage: React.FC<PageProps> = () => {
  return <></>;
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <html lang="de"></html>
    <title>Snek Docs</title>
    <meta name="description" content="Snek Docs" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </>
);
