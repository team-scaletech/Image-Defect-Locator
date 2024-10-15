import { FC, useRef, useEffect, useState } from "react";
import DefectLocatImage from "./components/defectLocator";

import { ImageDefectLocatorContainerProps } from "../typings/ImageDefectLocatorProps";
import { GUID } from "mendix";
import { v4 as uuidv4 } from "uuid";

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
    selection,
    onChangeAction,
    myObject,
    // XPositionAttribute,
    // YPositionAttribute,
    // noteAttribute,
    objectsDatasource
}) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [imageValue, setImageValue] = useState<ImageData | null>(null);
    const [functionCount, setFunctionCount] = useState(0);

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

        if (objectsDatasource && imageValue?.src) {
            try {
                const { items } = objectsDatasource;

                datavalue = items
                    ? items
                          .map((item: any) => {
                              const defectAttributes = item[Object.getOwnPropertySymbols(item)[0]].jsonData.attributes;

                              const xPos = defectAttributes.XPosition.value;
                              const yPos = defectAttributes.YPosition.value;
                              const note = defectAttributes.Note.value;

                              // Return null if any required attribute is null
                              if (xPos == null || yPos == null || note == null) {
                                  return null;
                              }

                              return {
                                  x: Number(xPos),
                                  y: Number(yPos),
                                  note: note || ""
                              };
                          })
                          // Filter out null values
                          .filter((item): item is DefectsObjectList => item !== null)
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
        if (imageValue && selection) {
            const updatedImage = { ...imageValue, defects: [...imageValue.defects, defect] };

            // Update the state with the new image
            setImageValue(updatedImage);
            const defectArray = [...imageValue.defects, defect];

            // const defectArrayValue = defectArray.map(defect => ({
            //     id: uuidv4() as GUID, // or use some unique identifier
            //     x: defect.x,
            //     y: defect.y,
            //     note: defect.note
            // }));
            // console.warn("🚀 ~ defectArrayValue ~ defectArrayValue:", defectArrayValue);
            const newObject = {
                ...defect,
                id: uuidv4() as GUID
            };
            console.warn("🚀 ~ addDefectToImage ~ newObject:", newObject);
            // selection.selection.push(newObject);
            selection.setSelection([newObject]);

            // if (XPositionAttribute && YPositionAttribute && noteAttribute) {
            //     const roundedX = defect.x.toString();
            //     const roundedY = defect.y.toString();
            //     XPositionAttribute.setTextValue(roundedX);
            //     YPositionAttribute.setTextValue(roundedY);
            //     noteAttribute.setTextValue(defect.note);

            //     XPositionAttribute.universe;
            //     if (markerAction) {
            //         try {
            //             markerAction.execute();
            //         } catch (error) {
            //             console.error("Failed to execute markerAction:", error);
            //         }
            //     } else {
            //         console.warn("markerAction is not available or cannot be executed.");
            //     }
            // }
            const defectObje = myObject[functionCount];
            if (defectObje.XPositionAttribute && defectObje.YPositionAttribute && defectObje.noteAttribute) {
                const roundedX = defect.x.toString();
                const roundedY = defect.y.toString();
                defectObje.XPositionAttribute.setTextValue(roundedX);
                defectObje.YPositionAttribute.setTextValue(roundedY);
                defectObje.noteAttribute.setTextValue(defect.note);
            }
            setFunctionCount(functionCount + 1);
        }
    };
    console.warn("🚀 ~ selection:", selection?.selection);

    return (
        <div ref={nodeRef}>
            {imageValue && <DefectLocatImage imageValue={imageValue} addDefectToImage={addDefectToImage} />}
        </div>
    );
};
