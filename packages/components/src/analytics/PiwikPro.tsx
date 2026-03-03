"use client";

import PiwikPro, {
  ContentTracking,
  type Dimensions,
  DownloadAndOutlink,
  ErrorTracking,
  PageViews,
  SiteSearch,
} from "@piwikpro/react-piwik-pro";
import { useEffect } from "react";

interface AnalyticsProps {
  siteId: string;
  accountAddress: string;
  dataLayerName?: string;
  trackJSErrors?: boolean;
  downloadExtensions?: string[];
  pageTitle?: string;
  isSearchPage?: boolean;
  searchObject?: {
    keyword: string;
    category?: string;
    searchCount?: number;
    dimensions?: Dimensions;
  };
}

// Default extra download extensions in addition to the standard ones tracked by Piwik Pro.
const DOWNLOAD_EXTENSIONS = ["json", "yaml", "yml"];

export default function Analytics(props: AnalyticsProps) {
  /* const nonce = `n.${Math.random() * 1000000}`; // TODO: replace with nanoid or uuid */
  const {
    siteId,
    accountAddress,
    dataLayerName,
    trackJSErrors = true,
    pageTitle,
    isSearchPage,
    searchObject,
  } = props;
  const downloadExtensions = [
    ...DOWNLOAD_EXTENSIONS,
    ...(props.downloadExtensions || []),
  ];

  PiwikPro.initialize(siteId, accountAddress, {
    /* nonce, */
    dataLayerName,
  });

  DownloadAndOutlink.addDownloadExtensions(downloadExtensions);

  ContentTracking.trackAllContentImpressions();
  ContentTracking.trackVisibleContentImpressions(true);

  if (trackJSErrors) {
    ErrorTracking.enableJSErrorTracking();
  }

  useEffect(() => {
    if (pageTitle && !isSearchPage) {
      PageViews.trackPageView(pageTitle);
    } else if (isSearchPage && searchObject?.keyword) {
      const { keyword, category, searchCount, dimensions } = searchObject;
      SiteSearch.trackSiteSearch(keyword, category, searchCount, dimensions);
    }
  }, [pageTitle, isSearchPage, searchObject]);

  return null;
}
