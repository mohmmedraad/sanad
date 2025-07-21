"use client";

import { LinkPlugin } from "@udecode/plate-link/react";

import { LinkFloatingToolbar } from "../link-floating-toolbar";

export const linkPlugin = LinkPlugin.extend({
    render: { afterEditable: () => <LinkFloatingToolbar /> },
});
