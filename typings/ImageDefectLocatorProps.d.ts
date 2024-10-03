/**
 * This file was generated from ImageDefectLocator.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";
import { Big } from "big.js";

export interface DefectsDataType {
    XPositionAttribute: EditableValue<Big>;
    YPositionAttribute: EditableValue<Big>;
    noteAttribute: EditableValue<string>;
}

export interface DefectsDataPreviewType {
    XPositionAttribute: string;
    YPositionAttribute: string;
    noteAttribute: string;
}

export interface ImageDefectLocatorContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    imageData: EditableValue<string>;
    defectsData: DefectsDataType[];
    imageAction?: ActionValue;
}

export interface ImageDefectLocatorPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    imageData: string;
    defectsData: DefectsDataPreviewType[];
    imageAction: {} | null;
}
