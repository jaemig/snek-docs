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
import smtShared from "./semanticTokens/shared";

const themeSemanticTokens = {
  colors: {
    components: {
      separator: smtpSeparatorComponent,
      button: smtButtonComponent,
      drawer: smtDrawerComponent,
      menu: smtMenuComponent,
      codeSnippet: smtCodeSnippetComponent,
      filesystem: smtFilesystemComponent,
      heading: smtHeadingComponent,
      callout: smtCalloutComponent,
      imageCard: smtImageCardComponent,
      iconCard: smtIconCardComponent,
    },
    shared: smtShared,
    topNav: smtTopNav,
    leftNav: smtLeftNav,
    main: smtMain,
    rightNav: smtRightNav,
    footer: smtFooter,
  }
};

export default themeSemanticTokens;
