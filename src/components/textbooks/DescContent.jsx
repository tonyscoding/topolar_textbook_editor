import React, {useEffect, useMemo, useState, useContext} from 'react'
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import Editor from '@/components/textbooks/Editor';
import { TextbookContext } from '@/contexts/TextbookContext';


export const DescContent = ({components_item, index, hoverItemIndex, setHoverItemIndex, count_for_key, ButtonGroup}) => {
  console.log("desc rerenderd");
  // const { imageLib, setImageLib, addImageLib } = useContext(ImageContext);
  //const image = useMemo(()=>loadImage(components_item.src),[components_item]);
  // console.log("dirname : ",__dirname)

  const [item, setItem] = useState('');
  const [wantEdit, setWantEdit] = useState(false);

  const { setDescription } = useContext(TextbookContext);


  useEffect(() => {
    if (!item || item != components_item.description) {
      setItem(components_item.description);
      console.log("setItem");
    }
  }, [components_item])

  const handleText = (newText) => {
    setItem(newText);
  }

  const handleBlur = (e) => {
    setWantEdit(false);
    setDescription(index, item);
  }

  return (
    <div 
      className={"body-desc"}
      key={components_item.description+count_for_key}
      onMouseEnter={() => {setHoverItemIndex(index)}}
      onMouseLeave={() => {setHoverItemIndex(null)}}
      onDoubleClick={() => {setWantEdit(true)}}
    >
      {wantEdit ? 
        <div>
          <Editor
            placeholder={"이곳에 desc 입력"}
            text={item}
            handleChange={handleText}
            handleBlur={() => {handleBlur()}}
          />
        </div>
        :
        <>
        <div>
            <Markdown children={item} rehypePlugins={[rehypeRaw]} />
        </div>
        {hoverItemIndex === index && <ButtonGroup index={index}/>}
        </>
      }

        
    </div>
  );
}
