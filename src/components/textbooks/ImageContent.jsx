import React, {useEffect, useMemo, useContext} from 'react'
import DisplayImage from '@/components/textbooks/DisplayImage';
import reactHtmlParser from 'react-html-parser';
import { ImageContext } from '@/contexts/ImageContext';

export const ImageContent = ({components_item, index, hoverItemIndex, setHoverItemIndex, loadImage, count_for_key, selectedImage, setSelectedImage, ButtonGroup}) => {
  const { imageLib, setImageLib, addImageLib } = useContext(ImageContext);
  //const image = useMemo(()=>loadImage(components_item.src),[components_item]);
  console.log("image rerenderd")
  const image = useMemo(()=>imageLib.get(components_item.src),[components_item, imageLib]);
  // console.log("dirname : ",__dirname)
  return (
    <div key={components_item.src+count_for_key} onMouseEnter={() => {setHoverItemIndex(index)}} onMouseLeave={() => {setHoverItemIndex(null)}}>
      {/* <div
          style={{
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url('file://Users/eui-chan/Documents/tonysCoding/textbook_editor2/src/textbook/${components_item.src}')`,
          }}
          className="full-screen-img"
        /> */}
        {image === null || image === undefined ? 
        <>
        <h6>이미지를 찾을 수 없음 {components_item.src}</h6>
        <h6>{components_item.src} 선택하여 업로드 : </h6>
        <DisplayImage selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
        </> :
        <img src={image} alt={components_item.name}/>
        }
        {/* <img src={URL.createObjectURL("/Users/eui-chan/Documents/tonysCoding/textbook_simulator_edited/textbook/dino1/fillRect.png")} alt={components_item.name} width="300px" height="300px"/> */}
        {/* <img src={require("../../textbook/"+components_item.src)} alt={components_item.name}/> */}
        {/* <DisplayImage src={"/Users/eui-chan/Documents/tonysCoding/textbook_simulator_edited/textbook/dino1/fillRect.png"}/> */}
        {/* <RenderImage src={"file://Users/eui-chan/Documents/tonysCoding/textbook_simulator_edited/textbook/dino1/fillRect.png"}/> */}
        
        {/* <button onClick={readFile}>이미지 저장</button> */}
        {/* <button onClick={selectFolder}>선택2</button> */}
        <br />
        <b> {reactHtmlParser(components_item.name? components_item.name:null)} </b>
        <br />
        {hoverItemIndex === index && <ButtonGroup index={index}/>}
        
    </div> 
  );
}