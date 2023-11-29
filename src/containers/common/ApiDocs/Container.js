import React from 'react';
import PageContainer from 'components/common/PageContainer';
import Paragraph from '@george-gillams/components/paragraph';
import PageTitle from 'components/common/PageTitle';
import TextLink from 'components/common/TextLink';
import { Head, Body, Row, Cell } from '@george-gillams/components/table';
import { VerticalScrollContainer, Description, Method, StyledTable } from './api-docs.styles';

import apiStructure from 'helpers/common/apiStructureWithDescriptions';

const Container = () => (
  <PageContainer bottomPadding>
    <PageTitle name="API docs">
      <VerticalScrollContainer>
        <StyledTable>
          <Head>
            <Row>
              <Cell>
                <Paragraph padding={false}>Path</Paragraph>
              </Cell>
              <Cell>
                <Paragraph padding={false}>Method</Paragraph>
              </Cell>
              <Cell>
                <Paragraph padding={false}>Arguments</Paragraph>
              </Cell>
              <Cell>
                <Paragraph padding={false}>Authorisation</Paragraph>
              </Cell>
              <Cell>
                <Paragraph padding={false}>Description</Paragraph>
              </Cell>
            </Row>
          </Head>
          <Body>
            {Object.keys(apiStructure).map(key => {
              const apiCapability = apiStructure[key];
              return (
                <Row key={key}>
                  <Cell>
                    <TextLink href={apiCapability.fullPath} hrefExternal>
                      {apiCapability.path}
                    </TextLink>
                  </Cell>
                  <Cell>
                    <Method padding={false}>{apiCapability.method}</Method>
                  </Cell>
                  <Cell>
                    <Paragraph padding={false}>{apiCapability.arguments}</Paragraph>
                  </Cell>
                  <Cell>
                    <Paragraph padding={false}>{apiCapability.authorisation}</Paragraph>
                  </Cell>
                  <Cell>
                    <Description padding={false}>{apiCapability.description}</Description>
                  </Cell>
                </Row>
              );
            })}
          </Body>
        </StyledTable>
      </VerticalScrollContainer>
    </PageTitle>
  </PageContainer>
);

export default Container;
