import { Box, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import BaseContentLayout from '../layout/BaseContentLayout';
import { Field } from '@snek-at/jaen';
import { TextFieldProps } from '@snek-at/jaen/dist/fields/TextField/TextField';

/**
 * Content for the contact page.
 */
const ImprintContent: FC = () => {
  const textFieldProps: TextFieldProps = { display: 'inline-block' };

  return (
    <BaseContentLayout>
      <Heading as="h1" fontSize="4xl">
        Imprint
      </Heading>
      <Box mt={10}>
        <Field.Text
          as={Heading}
          fontSize="xl"
          mb={2}
          name="Company Details Title"
          defaultValue="Company Details"
        />
        <Text>
          Name:
          <Field.Text name="Company Name" {...textFieldProps} />
        </Text>
        <Text>
          Address: <Field.Text name="Company Address" {...textFieldProps} />
        </Text>
        <Text>
          Phone:
          <Field.Text name="Company Phone Number" {...textFieldProps} />
        </Text>
        <Text>
          Email:
          <Field.Text name="Company Mail Address" {...textFieldProps} />
        </Text>
      </Box>

      <Box my={5}>
        <Field.Text
          as={Heading}
          fontSize="xl"
          mb={2}
          name="Registration Details Title"
          defaultValue="Registration Details"
        />
        <Text>
          Registration Number:
          <Field.Text name="Company Registration Number" {...textFieldProps} />
        </Text>
        <Text>
          Registration Location:
          <Field.Text
            name="Company Registration Location"
            {...textFieldProps}
          />
        </Text>
      </Box>

      <Box my={5}>
        <Field.Text
          as={Heading}
          fontSize="xl"
          mb={2}
          name="VAT ID Title"
          defaultValue="VAT ID"
        />
        <Text>
          VAT ID:
          <Field.Text name="VAT ID" {...textFieldProps} />
        </Text>
      </Box>

      <Box my={5}>
        <Field.Text
          as={Heading}
          fontSize="xl"
          mb={2}
          name="Responsible for Content Title"
          defaultValue="Responsible for Content"
        />
        <Text>
          Responsible for Content:
          <Field.Text name="Responsible for Content" {...textFieldProps} />
        </Text>
      </Box>

      <Box my={5}>
        <Field.Text
          as={Heading}
          fontSize="xl"
          mb={2}
          name="Data Protection Officer"
          defaultValue="Data Protection Officer"
        />
        <Text>
          Name:
          <Field.Text name="Name" {...textFieldProps} />
        </Text>
        <Text>
          Contact:
          <Field.Text name="Contact" {...textFieldProps} />
        </Text>
      </Box>
      <Field.Text
        mt={10}
        as={Heading}
        fontSize="xl"
        name="Disclaimer Title"
        defaultValue="Disclaimer"
      />
      <Field.Text
        name="Disclaimer Text"
        defaultValue="All texts on the website have been carefully checked. Regardless, no guarantee can be given for the correctness, completeness, and timeliness of the information. The contents of this website may not be duplicated and/or stored in information systems used for data transmission, either in whole or in part, for commercial purposes without prior permission from the copyright owner. Claims for damages due to direct or indirect damages resulting from the use of the WWW documents cannot be made against the WWW responsible party or the author. If the document refers to commercial websites through hyperlinks, this does not constitute a recommendation. These links are only intended to show an (incomplete) selection of options. Therefore, there is no claim for websites not considered to be included in the document. No guarantee is given for information reached via external cross-references (hyperlinks)."
      />
      <Field.Text
        mt={10}
        as={Heading}
        fontSize="xl"
        name="Privacy Policy Title"
        defaultValue="Privacy Policy"
      />
      <Field.Text
        name="Privacy Policy Text"
        defaultValue="We commit to protecting the privacy of all individuals who use our site and to treat confidentially the personal data provided to us by customers, partners, and interested parties. In principle, you can visit and browse our website at any time without providing personal information. Personal data that you provide to us via registration on our site will not be sold or passed on to third parties, but is intended exclusively for internal company use."
      />
      <Field.Text
        mt={10}
        as={Heading}
        fontSize="xl"
        name="Google Analytics Title"
        defaultValue="Google Analytics"
      />
      <Field.Text
        name="Google Analytics Text"
        defaultValue={`This website uses Google Analytics, a web analysis service of Google Inc. ("Google"). Google Analytics uses so-called "cookies", text files that are stored on your computer and that allow an analysis of your use of the website. The information generated by the cookie about your use of this website (including your IP address) is transmitted to a Google server in the USA and stored there. Google will use this information to evaluate your use of the website, to compile reports on website activities for website operators, and to provide other services related to website usage and internet usage. Google may also transfer this information to third parties if required by law or as far as third parties process this data on behalf of Google. Under no circumstances will Google associate your IP address with other Google data. You can prevent the installation of cookies by setting your browser software accordingly; however, we would like to point out that in this case, you may not be able to fully use all the functions of this website. By using this website, you agree to the processing of data collected about you by Google in the manner and for the purposes set out above.`}
      />
    </BaseContentLayout>
  );
};

export default ImprintContent;
1;
