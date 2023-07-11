import smtButtonComponent from "./semanticTokens/components/button";
import smtCalloutComponent from "./semanticTokens/components/callout";
import smtCodeSnippetComponent from "./semanticTokens/components/codeSnippet";
import smtDrawerComponent from "./semanticTokens/components/drawer";
import smtFilesystemComponent from "./semanticTokens/components/filesystem";
import smtHeadingComponent from "./semanticTokens/components/heading";
import smtIconCardComponent from "./semanticTokens/components/iconCard";
import smtImageCardComponent from "./semanticTokens/components/imageCard";
import smtMenuComponent from "./semanticTokens/components/menu";
import smtpSeparatorComponent from "./semanticTokens/components/separator";
import smtFooter from "./semanticTokens/layout/footer";
import smtLeftNav from "./semanticTokens/layout/leftNav";
import smtMain from "./semanticTokens/layout/main";
import smtRightNav from "./semanticTokens/layout/rightNav";
import smtTopNav from "./semanticTokens/layout/topNav";
import smtPqTopNav from "./photonq/semanticTokens/layout/topNav";
import smtPqShared from "./photonq/semanticTokens/shared";
import smtShared from "./semanticTokens/shared";
import smtPqSectionLabel from "./photonq/semanticTokens/components/sectionLabel";
import smtPqFeatureCard from "./photonq/semanticTokens/components/featureCard";
import smtcodeResultPreviewComponent from "./semanticTokens/components/codeResultPreview";
import smtUserProfilePage from "./semanticTokens/pages/userProfile";
import smtPostPreview from "./semanticTokens/components/postPreview";

const themeSemanticTokens = {
  colors: {
    components: {
      separator: smtpSeparatorComponent,
      button: smtButtonComponent,
      drawer: smtDrawerComponent,
      menu: smtMenuComponent,
      codeSnippet: smtCodeSnippetComponent,
      codeResultPreview: smtcodeResultPreviewComponent,
      filesystem: smtFilesystemComponent,
      heading: smtHeadingComponent,
      callout: smtCalloutComponent,
      imageCard: smtImageCardComponent,
      iconCard: smtIconCardComponent,
      postPreview: smtPostPreview,
    },
    pages: {
      userProfile: smtUserProfilePage,
    },
    shared: smtShared,
    topNav: smtTopNav,
    leftNav: smtLeftNav,
    main: smtMain,
    rightNav: smtRightNav,
    footer: smtFooter,

    /**
     * PHOTONQ SECTION
     */
    pq: {
      shared: smtPqShared,
      layout: {
        topNav: smtPqTopNav,
      },
      components: {
        sectionLabel: smtPqSectionLabel,
        featureCard: smtPqFeatureCard,
      }
    }
  }
};

export default themeSemanticTokens;
