import React from 'react';

import Editor from 'react-simple-code-editor';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';

import "../assets/css/Classroom.css";

class CodeHighlighter extends React.Component {
    constructor(props){
        super(props);
    }

    highlight = (code) => (
        <Highlight {...defaultProps} theme={theme} code={code} language={this.props.language?this.props.language:''}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <div className='classname-textarea-highlight-temp'>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                        </div>
                    ))}
                </div>
            )}
        </Highlight>
    )

    render() {
        const { readOnly, language, codes } = this.props;
        
        return (
            <div style={{width:"100%", height:"100%"}}>
                {language === ""?
                <div>언어를 선택해 주세요</div>
                :
                language === 'scratch'?
                <div className='flex-fill w-100'>
                    <input
                        className='input-general'
                        placeholder="링크를 입력해주세요."
                        onChange={this.props.onCodeChange}
                        value={codes}
                        readOnly={readOnly?true:false}
                    />
                </div>
                :
                <div className={(readOnly ? 'classroom-textarea-container-readOnly' : 'classroom-textarea-container')}>
                    {readOnly?
                    <div>
                    <Highlight {...defaultProps} theme={theme} code={codes} language={this.props.language?this.props.language:''}>
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <div className='classroom-code-container'>
                                {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line, key: i })}>
                                    <span className='LineNo'>{i + 1}</span>
                                    <span className='LineContent'>
                                        <div >
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token, key })} />
                                        ))}
                                        </div>
                                    </span>
                                </div>
                                ))}
                            </div>
                        )}
                    </Highlight>
                    </div>
                    :
                    <div className='classroom-editor-container'>
                        <Editor
                            value={codes}
                            onValueChange={this.props.onValueChange}
                            highlight={this.highlight}
                            textareaClassName='classroom-textarea'
                            preClassName='classroom-pre'
                            tabSize={4}
                            padding={10}
                        />
                    </div>
                    }
                    
                </div>
                }
            </div>
        )
    }
}

export default CodeHighlighter;

