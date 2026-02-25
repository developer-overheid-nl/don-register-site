"use client";

import PiwikPro, {
  ClientConfiguration,
  CrossDomainTracking,
  DownloadAndOutlink,
  PageViews,
} from "@piwikpro/react-piwik-pro";
import { useId } from "react";

interface AnalyticsProps {
  siteId: string;
  accountAddress: string;
  dataLayerName?: string;
  linkedDomains?: string[];
  downloadExtensions?: string[];
  pageTitle?: string;
}

// Default extra download extensions in addition to the standard ones tracked by Piwik Pro.
const DOWNLOAD_EXTENSIONS = ["json", "yaml", "yml"];

export default function Analytics(props: AnalyticsProps) {
  const nonce = useId(); // TODO: replace with nanoid or uuid
  const {
    siteId,
    accountAddress,
    dataLayerName,
    linkedDomains,

    pageTitle,
  } = props;
  const downloadExtensions = [
    ...DOWNLOAD_EXTENSIONS,
    ...(props.downloadExtensions || []),
  ];
  console.log("Initializing Piwik Pro Analytics with id:", {
    siteId,
    accountAddress,
    dataLayerName,
    nonce,
  });

  PiwikPro.initialize(siteId, accountAddress, {
    nonce,
    dataLayerName,
  });

  DownloadAndOutlink.addDownloadExtensions(downloadExtensions);

  if (linkedDomains && linkedDomains.length > 0) {
    ClientConfiguration.setDomains(linkedDomains);
    CrossDomainTracking.enableCrossDomainLinking();
  }

  if (pageTitle) {
    PageViews.trackPageView(pageTitle);
  }

  return;
}
