import { FC, useRef, useEffect, useState } from "react";
import DefectLocatImage from "./components/defectLocator";

import { ImageDefectLocatorContainerProps } from "../typings/ImageDefectLocatorProps";

import "./ui/ImageDefectLocator.css";
export interface Defect {
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
    defectsData
}) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [imageValue, setImageValue] = useState<ImageData | null>(null);

    useEffect(() => {
        // short timeout to make sure all the upload widgets are available on the page
        const timeoutId = setTimeout(() => {
            const parentNode = nodeRef.current?.parentNode;
            const uploader = parentNode?.querySelector("input[type=file]") as HTMLInputElement | null;

            if (uploader) {
                uploader.onchange = onChange;
            }
        }, 200);

        // Cleanup function to clear timeout when component unmounts
        return () => clearTimeout(timeoutId);
    }, []);

    // useEffect(() => {
    //     if (ImageUrl?.value?.uri) {
    //         const newImageSrc = ImageUrl.value.uri;

    //         // Initialize defects array if image is new, otherwise preserve existing defects
    //         const newImage = {
    //             src: newImageSrc,
    //             defects: imageValue?.defects || [] // Keep existing defects if any, else start with an empty array
    //         };

    //         // Update the image if the src has changed
    //         if (newImageSrc !== imageValue?.src) {
    //             setImageValue(newImage); // Set the new image
    //         }

    //         // Handle defect update only if valid X, Y, and note values are present
    //         if (XPositionAttribute?.value && YPositionAttribute?.value && noteAttribute?.value) {
    //             const roundedX = Number(XPositionAttribute.value);
    //             const roundedY = Number(YPositionAttribute.value);

    //             const newDefect: Defect = {
    //                 x: roundedX,
    //                 y: roundedY,
    //                 note: noteAttribute.value
    //             };

    //             // Check if the defect already exists to avoid duplicates
    //             const isDefectPresent = newImage.defects.some(
    //                 defect => defect.x === newDefect.x && defect.y === newDefect.y && defect.note === newDefect.note
    //             );

    //             if (!isDefectPresent) {
    //                 // Add new defect to the image
    //                 const updatedImage = { ...newImage, defects: [...newImage.defects, newDefect] };
    //                 setImageValue(updatedImage);
    //             }
    //         }
    //     }
    // }, [ImageUrl?.value, XPositionAttribute?.value, YPositionAttribute?.value, noteAttribute?.value]);

    useEffect(() => {
        if (ImageUrl?.value?.uri) {
            const newImageSrc = ImageUrl.value.uri;

            // Initialize defects array if image is new, otherwise preserve existing defects
            const newImage = {
                src: newImageSrc,
                defects: imageValue?.defects || [] // Keep existing defects if any, else start with an empty array
            };

            // Update the image if the src has changed
            if (newImageSrc !== imageValue?.src) {
                setImageValue(newImage); // Set the new image
            }

            // Handle defect update only if valid X, Y, and note values are present
            const newDefectItem = defectsData[0];
            if (
                newDefectItem.XPositionAttribute.value ||
                newDefectItem.YPositionAttribute.value ||
                newDefectItem.noteAttribute.value
            ) {
                const roundedX = Number(newDefectItem.XPositionAttribute.value);
                const roundedY = Number(newDefectItem.YPositionAttribute.value);

                const newDefect: Defect = {
                    x: roundedX,
                    y: roundedY,
                    note: newDefectItem.noteAttribute.value as string
                };

                // Check if the defect already exists to avoid duplicates
                const isDefectPresent = newImage.defects.some(
                    defect => defect.x === newDefect.x && defect.y === newDefect.y && defect.note === newDefect.note
                );

                if (!isDefectPresent) {
                    // Add new defect to the image
                    const updatedImage = { ...newImage, defects: [...newImage.defects, newDefect] };
                    setImageValue(updatedImage);
                }
            }
        }
    }, [ImageUrl?.value, defectsData]);

    const onChange = () => {
        if (onChangeAction) {
            onChangeAction.execute();
        }
    };

    // const addDefectToImage = (defect: Defect) => {
    //     if (imageValue) {
    //         // Update the image with the new defect
    //         const updatedImage = { ...imageValue, defects: [...imageValue.defects, defect] };

    //         // Update the state with the new image
    //         setImageValue(updatedImage);
    //         if (XPositionAttribute && YPositionAttribute && noteAttribute) {
    //             const roundedX = defect.x.toString();
    //             const roundedY = defect.y.toString();
    //             XPositionAttribute.setValue(roundedX);
    //             YPositionAttribute.setValue(roundedY);
    //             noteAttribute.setValue(defect.note);
    //             if (markerAction) {
    //                 try {
    //                     markerAction.execute(); // This is synchronous, so no .then() here
    //                 } catch (error) {
    //                     console.error("Failed to execute markerAction:", error);
    //                 }
    //             } else {
    //                 console.warn("markerAction is not available or cannot be executed.");
    //             }
    //         }
    //     }
    // };
    const addDefectToImage = (defect: Defect) => {
        if (imageValue) {
            // Update the image with the new defect
            const updatedImage = { ...imageValue, defects: [...imageValue.defects, defect] };

            // Update the state with the new image
            setImageValue(updatedImage);
            if (defectsData) {
                const newDefectItem = defectsData[0];
                const roundedX = defect.x.toString();
                const roundedY = defect.y.toString();
                newDefectItem.XPositionAttribute.setValue(roundedX);
                newDefectItem.YPositionAttribute.setValue(roundedY);
                newDefectItem.noteAttribute.setValue(defect.note);
                if (markerAction) {
                    try {
                        markerAction.execute(); // This is synchronous, so no .then() here
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
