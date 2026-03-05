"use client";

import PiwikPro, {
  ContentTracking,
  CustomEvent,
  type Dimensions,
  DownloadAndOutlink,
  ErrorTracking,
  SiteSearch,
} from "@piwikpro/react-piwik-pro";
import { useEffect } from "react";

declare global {
  interface Window {
    _paq: unknown[];
  }
}

interface AnalyticsProps {
  siteId: string;
  accountAddress: string;
  dataLayerName?: string;
  trackJSErrors?: boolean;
  downloadExtensions?: string[];
  /**
   * @deprecated This property is deprecated.
   */
  pageTitle?: string;
  customEvent?: { category?: string; action?: string; name: string };
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
    customEvent,
    isSearchPage,
    searchObject,
  } = props;
  const downloadExtensions = [
    ...DOWNLOAD_EXTENSIONS,
    ...(props.downloadExtensions || []),
  ];

  if (pageTitle) {
    console.warn(
      "The 'pageTitle' property is deprecated and will be removed in future versions.",
    );
  }

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
    if (customEvent) {
      CustomEvent.trackEvent(
        customEvent.category || "Pages",
        customEvent.action || "view",
        customEvent.name,
      );
    }
    if (isSearchPage && searchObject?.keyword) {
      const { keyword, category, searchCount, dimensions } = searchObject;
      SiteSearch.trackSiteSearch(keyword, category, searchCount, dimensions);
    }
  }, [customEvent, isSearchPage, searchObject]);

  return null;
}
