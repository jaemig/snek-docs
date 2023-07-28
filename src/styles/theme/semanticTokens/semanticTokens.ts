import smtButtonComponent from './components/button';
import smtCalloutComponent from '../../../features/main-content/callout/styles/callout';
import smtCodeSnippetComponent from '../../../features/main-content/code-snippet/styles/codeSnippet';
import smtDrawerComponent from './components/drawer';
import smtFilesystemComponent from '../../../features/main-content/filesystem/styles/filesystem';
import smtHeadingComponent from './components/heading';
import smtIconCardComponent from '../../../features/main-content/icon-card/styles/iconCard';
import smtImageCardComponent from '../../../features/main-content/image-card/styles/imageCard';
import smtMenuComponent from './components/menu';
import smtpSeparatorComponent from './components/separator';
import smtFooter from './layout/footer';
import smtLeftNav from './layout/leftNav';
import smtMain from './layout/main';
import smtRightNav from './layout/rightNav';
import smtTopNav from './layout/topNav';
import smtPqTopNav from '../photonq/semanticTokens/layout/topNav';
import smtPqShared from '../photonq/semanticTokens/shared';
import smtShared from './shared';
import smtPqSectionLabel from '../photonq/semanticTokens/components/sectionLabel';
import smtPqFeatureCard from '../photonq/semanticTokens/components/featureCard';
import smtcodeResultPreviewComponent from '../../../features/main-content/code-result-preview/styles/codeResultPreview';
import smtUserProfilePage from '../../../features/user/profile/styles/userProfile';
import smtUserActivityComponent from '../../../features/user/activity/styles/userActivity';
import smtStepperComponent from './components/stepper';
import smtPostPreviewComponent from '../../../features/post/preview/styles/postPreview';
import smtPostsPage from '../../../features/post/styles/posts';
import smtInputComponent from './components/input';
import smtPostPublishModal from '../../../features/post/editor/styles/postPublishModal';

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
      postPreview: smtPostPreviewComponent,
      userActivity: smtUserActivityComponent,
      stepper: smtStepperComponent,
      input: smtInputComponent,
    },
    modals: {
      postPublish: smtPostPublishModal,
    },
    pages: {
      userProfile: smtUserProfilePage,
      posts: smtPostsPage
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
        topNav: smtPqTopNav
      },
      components: {
        sectionLabel: smtPqSectionLabel,
        featureCard: smtPqFeatureCard
      }
    }
  }
};

export default themeSemanticTokens;
