/**
 * This file was generated from ImageDefectLocator.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, WebImage } from "mendix";

export interface DefectsDataType {
    XPositionAttribute: EditableValue<string>;
    YPositionAttribute: EditableValue<string>;
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
    ImageUrl: DynamicValue<WebImage>;
    defectsData: DefectsDataType[];
    markerAction?: ActionValue;
    onChangeAction?: ActionValue;
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
    ImageUrl: { type: "static"; imageUrl: string; } | { type: "dynamic"; entity: string; } | null;
    defectsData: DefectsDataPreviewType[];
    markerAction: {} | null;
    onChangeAction: {} | null;
}
