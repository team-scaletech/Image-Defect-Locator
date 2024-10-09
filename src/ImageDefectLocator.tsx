import { FC, useRef, useEffect, useState } from "react";
import DefectLocatImage from "./components/defectLocator";

import { ImageDefectLocatorContainerProps } from "../typings/ImageDefectLocatorProps";

import "./ui/ImageDefectLocator.css";
export interface Defect {
    x: number;
    y: number;
    note: string;
}
interface DefectsObjectList {
    x: number;
    y: number;
    note: string;
}

export interface ImageData {
    src: string;
    defects: Defect[];
}
export const ImageDefectLocator: FC<ImageDefectLocatorContainerProps> = ({
    ImageUrl,
    markerAction,
    onChangeAction,
    XPositionAttribute,
    YPositionAttribute,
    noteAttribute,
    objectsDatasource
}) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [imageValue, setImageValue] = useState<ImageData | null>(null);

    // Explicitly typing the state as DefectsObjectList[]
    const [defectsObjectList, setdefectsObjectList] = useState<DefectsObjectList[]>([]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const parentNode = nodeRef.current?.parentNode;
            const uploader = parentNode?.querySelector("input[type=file]") as HTMLInputElement | null;

            if (uploader) {
                uploader.onchange = onChange;
            }
        }, 200);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        let datavalue: DefectsObjectList[] = [];

        if (objectsDatasource) {
            try {
                const { items } = objectsDatasource;

                datavalue = items
                    ? items.map((item: any) => {
                          const defectAttributes = item[Object.getOwnPropertySymbols(item)[0]].jsonData.attributes;

                          return {
                              x: Number(defectAttributes.XPosition.value),
                              y: Number(defectAttributes.YPosition.value),
                              note: defectAttributes.Note.value || ""
                          };
                      })
                    : [];

                const updatedImage = { ...imageValue, defects: datavalue };

                // Update the state with the new image
                setImageValue(updatedImage as any);
                setdefectsObjectList(datavalue);
            } catch (e) {
                console.log("Error in processing defects", e);
            }
        }
    }, [objectsDatasource]);

    useEffect(() => {
        if (ImageUrl?.value?.uri) {
            const newImageSrc = ImageUrl.value.uri;

            const newImage = {
                src: newImageSrc,
                defects: imageValue?.defects || defectsObjectList || []
            };

            if (newImageSrc !== imageValue?.src) {
                setImageValue(newImage);
            }
        }
    }, [ImageUrl?.value?.uri]);

    const onChange = () => {
        if (onChangeAction) {
            onChangeAction.execute();
        }
    };

    const addDefectToImage = (defect: Defect) => {
        if (imageValue) {
            const updatedImage = { ...imageValue, defects: [...imageValue.defects, defect] };

            // Update the state with the new image
            setImageValue(updatedImage);
            if (XPositionAttribute && YPositionAttribute && noteAttribute) {
                const roundedX = defect.x.toString();
                const roundedY = defect.y.toString();
                XPositionAttribute.setValue(roundedX);
                YPositionAttribute.setValue(roundedY);
                noteAttribute.setValue(defect.note);
                if (markerAction) {
                    try {
                        markerAction.execute();
                    } catch (error) {
                        console.error("Failed to execute markerAction:", error);
                    }
                } else {
                    console.warn("markerAction is not available or cannot be executed.");
                }
            }
        }
    };

    return (
        <div ref={nodeRef}>
            {imageValue && <DefectLocatImage imageValue={imageValue} addDefectToImage={addDefectToImage} />}
        </div>
    );
};
