import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Button from './Button';
import Tabs from './Tabs';
import Checkbox  from './SelectonControl/Checkbox';
import RadioButton from './SelectonControl/RadioButton';
import ToggleSwitch from './SelectonControl/ToggleSwitch';
import { showToast } from '../helpers/toast';
import NewModal from './Modal';
import Popup from './Popup';
import SuccessModal from 'pages/root/Modal/SignUpSuccessModal';
import {Card, LineBreak} from './Card';
import VideoTest from 'assets/root_img/UserReview/video210723.png';
import Pagination from './Pagination';
import { Input, Textarea } from './TextFields';
import {Dropdown, Option} from './Dropdown';
import {getFranchise} from 'redux/actions/api_franchise';
import useApi from 'components/Hooks/useApi';
import ReactPlayer from 'react-player/youtube';
import Modal from 'components/Modal';
import { checkFormatTemp } from 'pages/root/SignUp/formatters';
import Loader from 'guideComponents/Loader';

// deprecated
const ComponentTest = ({}) => {
    // tab state
    const [activeTab, setActiveTab] = useState(1)
    // modal isOpen state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const [isModal3Open, setIsModal3Open] = useState(false);
    const [isModal4Open, setIsModal4Open] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // selection controls state
    const [check, setCheck] = useState(true);
    const [radio, setRadio] = useState();
    const [toggleSwitch, setToggleSwitch] = useState(true);
    // dropdown value state
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [value3, setValue3] = useState();
    const [location, setLocation] = useState();
    // input value state
    const [input1, setInput] = useState();
    const [searchInput, setSearchInput] = useState();
    const [password, setPassword] = useState('');
    const [name, setName] = useState("토폴라");
    const [valueText, setValueText] = useState("12345");
    // for test
    const [totalPostTest, setTotalPostTest] = useState(8);
    const [date, setDate] = useState();

    useEffect(()=>{
        setTimeout(() => {
            setTotalPostTest(20)
        }, 5000);
    },[])

    const dispatch = useDispatch();
    const [loading, resolved, rejected, getFranchiseForComp] = useApi(getFranchise)
    const franchiseList = useSelector(state => state.api_franchise.franchise_list, shallowEqual)

    useEffect(()=>{
        getFranchiseForComp();
    },[])

    const toggleSwitchTest = () => {
        console.log("toggle switch is togged")
    }

    const changeFranchise = (value) => {
        setLocation(value)
    }

    const onChangeDropdown1 = (value) => {
        setValue1(value)
    }
    const onChangeDropdown2 = (value) => {
        setValue2(value)
    }
    const onChangeDropdown3 = (value) => {
        setValue3(value)
    }
    const screenSize = useSelector(state=>state.auth.screen_size);

    const [loadingTest, setLoadingTest] = useState(false)
    useEffect(()=>{
        setTimeout(() => {
            setLoadingTest(false)
        }, 1000);
    },[])

    if (loadingTest) {
        return (
            <Loader
                type="flash"
                color="grey"
            />
        )
    }
    return (
        <>
            <NewModal 
                isOpen={isModalOpen}
                title="ModalTest"
                size="lg"
                toggle={()=>setIsModalOpen(!isModalOpen)}
                centered
            >
                <div style={{display:"flex", gap:"10px"}}>
                <Button onClick={()=>{setIsModal3Open(!isModal3Open)}}>dupModal</Button>
                    <Button onClick={()=>{setIsModal2Open(!isModal2Open)}}>video modal</Button>
                </div>
            </NewModal>
            <NewModal 
                isOpen={isModal2Open}
                title="ModalVideo"
                size="lg"
                toggle={()=>setIsModal2Open(!isModal2Open)}
                childOnly
                centered
            >
                <ReactPlayer url={"https://youtu.be/u9gubBQocjQ"} controls width="100%" height={screenSize==="desktop"?'566px':'180px'} />
            </NewModal>
            <NewModal
                title="TEST1111"
                isOpen={isModal3Open}
                toggle={()=>setIsModal3Open(!isModal3Open)}
                size="md"
                centered
            >
                <Input
                    name="input1"
                    checkValid={checkFormatTemp}
                    value={password}
                    onChange={setPassword}
                    type="text"
                />
                <Button onClick={()=>setIsModal4Open(!isModal4Open)}>asdfasdf</Button>
            </NewModal>
            <NewModal
                title="TEST2222"
                isOpen={isModal4Open}
                toggle={()=>setIsModal4Open(!isModal4Open)}
            >
                HELLO WORLD
            </NewModal>
            <Popup
                isOpen={isPopupOpen}
                title="Popup Test"
                size="sm"
                toggle={()=>setIsPopupOpen(!isPopupOpen)}
                button1={{
                    name: "닫기1",
                    // onClick: ()=>console.log("this is tb button"),
                    color: "topolar-blue",
                }}
                button2={{
                    name: "닫기2",
                    onClick: ()=>console.log("this is grey button"),
                    color: "grey",
                }}
            >
                <div>HELLO!!!!</div>
            </Popup>
            <div className='component-test'>
                <Tabs
                    type="box-slider"
                    setParentActiveTab={setActiveTab}
                    initIndex={activeTab}
                    font={'body-2'}
                    // tabStyle={{width:"200px", height:"50px"}}
                >
                    Button, Selection, Cards,Loader
                </Tabs>
                <Tabs
                    type="text"
                    setParentActiveTab={setActiveTab}
                    initIndex={activeTab}
                    font={'body-2'}
                    vertical
                    // tabStyle={{width:"250px", height: "50px"}}
                >
                    Button, Selection Controls,Cards,Loader
                </Tabs>
                <Tabs
                    type="box"
                    setParentActiveTab={setActiveTab}
                    initIndex={activeTab}
                    font={'body-2'}
                    // tabStyle={{width:"250px", height: "50px"}}
                >
                    Button, Selection Controls,Cards,Loader
                </Tabs>
                <Tabs
                    type="line"
                    setParentActiveTab={setActiveTab}
                    initIndex={activeTab}
                    font={'body-2'}
                    // tabStyle={{width:"250px", height: "50px"}}
                >
                    Button,Selection Controls,Cards,Loader
                </Tabs>
                <Tabs
                    type="arrow"
                    setParentActiveTab={setActiveTab}
                    initIndex={activeTab}
                    font={'body-2'}
                    style={{width:"200px"}}
                >
                    Button, Selection Controls,Cards,Loader
                </Tabs>
                <Pagination
                    postPerPage={3}
                    totalPost={totalPostTest}
                    click={(idx)=>console.log(idx)}
                    delay
                />
                <div className="component-test-container">
                    {activeTab===0?
                    <div className='button-container'>
                        <Button
                            size='large'
                            type='fill'
                            color='topolar-blue'
                            onClick={()=>showToast('','success toast','success')}
                        >large_fill_button_topolar_blue</Button>
                        <Button
                            size='medium'
                            type='fill'
                            color='black'
                            onClick={()=>showToast('','success toast','success')}
                        >medium_fill_button_black</Button>
                        <Button
                            size='small'
                            type='fill'
                            color='grey'
                            onClick={()=>showToast('','success toast','success')}
                        >small_fill_button_grey</Button>
                        <Button
                            size='large'
                            type='line'
                            color='topolar-blue'
                        >large_line_button_topolar_blue</Button>
                        <Button
                            size='medium'
                            type='line'
                            color='black'
                            onClick={()=>showToast('','error toast','error')}
                        >medium_line_button_black</Button>
                        <Button
                            size='large'
                            type='text'
                            color='black'
                        >large_text_button_topolar_blue</Button>
                        <Button
                            size='medium'
                            type='text'
                            color='red'
                        >medium_text_button_black</Button>
                        <Button
                            size='small'
                            type='text'
                            color='topolar-blue'
                        >small_line_button_topolar_blue</Button>
                        <Button
                            size='large'
                            type='outline'
                            // active
                        >
                            outline test
                        </Button>
                        <Button
                            size='large'
                            type='fill'
                            color='topolar-blue'
                            block
                            onClick={()=>setIsModalOpen(!isModalOpen)}
                        >Open Modal</Button>
                        <Button
                            size='large'
                            type='fill'
                            color='topolar-blue'
                            block
                            onClick={()=>setIsModal2Open(!isModal2Open)}
                        >Open Modal Video</Button>
                        <Button
                            size='medium'
                            type='fill'
                            color='topolar-blue'
                            block
                            onClick={()=>setIsModal3Open(!isModal3Open)}
                        >Open modal 2</Button>
                        <Button
                            size='medium'
                            type='fill'
                            color='topolar-blue'
                            block
                            onClick={()=>setIsPopupOpen(!isPopupOpen)}
                        >Open Popup</Button>
                    </div>
                    :activeTab===1?
                    <>
                    <div className='checkbox-container'>
                        <Checkbox
                            size="large"
                            checked={check}
                            onClick={()=>setCheck(!check)}
                            color="grey90"
                        >
                            Large
                        </Checkbox>
                        <Checkbox
                            name="test"
                            value="test2"
                            size="medium"
                            onClick={(name, value)=>console.log("do nothing!", name, value)}
                        >
                            Medium
                        </Checkbox>
                        <Checkbox
                            name="test"
                            value="test3"
                            size="small"
                        >
                            Small
                        </Checkbox>
                        <RadioButton
                            name="radioName"
                            value="radioValue1"
                            size="large"
                            onClick={(e, name, value)=>{
                                setRadio(value)
                            }}
                            checked={radio==="radioValue1"?true:false}
                        >
                            Large
                        </RadioButton>
                        <RadioButton
                            name="radioName"
                            value="radioValue2"
                            size="medium"
                            onClick={(e, name, value)=>{
                                setRadio(value)
                            }}
                            checked={radio==="radioValue2"?true:false}
                        >
                            Medium
                        </RadioButton>
                        <RadioButton
                            name="radioName"
                            value="radioValue3"
                            size="small"
                            onClick={(e, name, value)=>{
                                setRadio(value)
                            }}
                            checked={radio==="radioValue3"?true:false}
                        >
                            Small
                        </RadioButton>
                        <ToggleSwitch
                            size="large"
                            onClick={()=>{toggleSwitchTest()}}
                            checked={true}
                        />
                        <ToggleSwitch
                            size="medium"
                        />
                        <ToggleSwitch
                            size="small"
                            checked
                        />
                        <ToggleSwitch
                            size="large"
                            bordered
                            on="연결"
                            off="해제"
                            onClick={()=>{setToggleSwitch(!toggleSwitch)}}
                            checked={toggleSwitch}
                        />
                        <ToggleSwitch
                            size="small"
                            bordered
                            checked
                        />
                    </div>
                    <div className='dropdown-container'>
                        <select name="select_name" style={{width:"200px"}}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                        <Dropdown
                            value={value1}
                            onChange={onChangeDropdown1}
                            placeholder="선택해 주세요"
                            font="body-2"
                        >
                            <Option value={1}>nameA</Option>
                            <Option value={2}>nameB</Option>
                            <Option value={3}>nameC</Option>
                            <Option value={4}>nameD</Option>
                        </Dropdown>
                        <Dropdown
                            value={value2}
                            onChange={onChangeDropdown2}
                            placeholder="선택해 주세요"
                            style={{width:"100px"}}
                        >
                            <Option value={1}>nameA</Option>
                            <Option value={2}>nameB</Option>
                            <Option value={3}>nameC</Option>
                            <Option value={4}>nameD</Option>
                        </Dropdown>
                        <Dropdown
                            value={value3}
                            onChange={onChangeDropdown3}
                            placeholder="선택해 주세요"
                            style={{width:"100px"}}
                            font="body-1"
                        >
                            <Option value={1}>one</Option>
                            <Option value={2}>two</Option>
                            <Option value={3}>threethreethreethree</Option>
                            <Option value={4}>four</Option>
                            <Option value={5}>five</Option>
                            <Option value={6}>six</Option>
                            <Option value={7}>seven</Option>
                            <Option value={8}>eight</Option>
                            <Option value={9}>nine</Option>
                            <Option value={10}>ten</Option>
                            <Option value={11}>eleven</Option>
                            <Option value={12}>twelve</Option>
                        </Dropdown>
                        {franchiseList&&franchiseList.length !== 0?
                        <Dropdown
                            value={location}
                            onChange={changeFranchise}
                            placeholder="가맹점 선택"
                        >
                            {
                            franchiseList.map((item, index)=>{
                                return (
                                    <Option key={index} value={item.id}>{item.location}</Option>
                                )
                            })
                            // :null
                            }
                        </Dropdown>
                        :
                        null
                        }
                        <Dropdown
                            value={value3}
                            onChange={onChangeDropdown3}
                            placeholder="선택해 주세요"
                            font="body-2"
                            disabled
                        >
                            <Option value={1}>one</Option>
                            <Option value={2}>two</Option>
                            <Option value={3}>three</Option>
                            <Option value={4}>four</Option>
                            <Option value={5}>five</Option>
                            <Option value={6}>six</Option>
                            <Option value={7}>seven</Option>
                            <Option value={8}>eight</Option>
                            <Option value={9}>nine</Option>
                            <Option value={10}>ten</Option>
                            <Option value={11}>eleven</Option>
                            <Option value={12}>twelve</Option>
                        </Dropdown>
                    </div>
                    <div className='textfield-container'>
                        <Input
                            name="input1"
                            checkValid={checkFormatTemp}
                            value={password}
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                            type="text"
                        />
                        <Input
                            name="input2"
                            checkValid={checkFormatTemp}
                            type="text"
                        />
                        <Input
                            name="input3"
                            type="text"
                            value={name}
                            onChange={(e)=>{
                                setName(e.target.value)
                            }}
                        />
                        <Input
                            name="input3"
                            disabled
                            placeholder="disabled"
                        />
                        <Input
                            name="dateSelect"
                            type="date"
                            value={date}
                            onChange={(e)=>{
                                const {name, value} = e.target;
                                setDate(value)
                            }}
                        />
                        <Input
                            name='searchInput'
                            value={searchInput}
                            search
                        />
                        <Input
                            name='searchInput'
                            value={searchInput}
                            search
                            disabled
                        />
                        <Textarea
                            style={{width:"300px", minHeight:"100px"}}
                            placeholder="scroll"
                            value={valueText}
                            className={"font-bold"}
                            onChange={(e)=>setValueText(e.target.value)}
                        />
                        <Textarea
                            style={{width:"300px", minHeight:"100px"}}
                            placeholder="autoResize"
                            autoResize
                        />
                    </div>
                    </>
                    :activeTab===2?
                    <div className='card-container'>
                        <Card
                            imgSrc={VideoTest}
                            imgHover={true}
                            hideLine={0}
                            hoverType="guide-border"
                            style={{minHeight: "400px"}}
                        >
                            <div>ASAAAAA</div>
                            <LineBreak className={'body-2'}>
                                저는 어렸을 때부터 목표가 MIT였어요!<br/>유명한 해외 공과대학에 들어가기 위해 토폴라에서 튜터 선생님과 열심히 준비하고 있습니다!
                            </LineBreak>
                        </Card>
                        <Card
                            width={"guide-col3"}
                            hoverType="shift"
                            style={{cursor:"pointer"}}
                        >
                            <div style={{display:'flex'}}>
                                <div>test1</div>
                                <div>test2</div>
                                <div>test3</div>
                            </div>
                            <div>
                                <div>test1</div>
                                <div>test2</div>
                                <div>test3</div>
                            </div>
                            <LineBreak className={'body-2'}>
                                대학교 전공수업을 보충하기 위해 토폴라를 수강하게 되었어요. 토폴라는 문제의 정답을 알려주기보다, 문제를 다양한 관점에서 해석하고 스스로 해결할 수 있는 능력을 길러주어서
                                대학교 전공수업을 보충하기 위해 토폴라를 수강하게 되었어요. 토폴라는 문제의 정답을 알려주기보다, 문제를 다양한 관점에서 해석하고 스스로 해결할 수 있는 능력을 길러주어서
                                확실히 다른 교육보다 응용력이 더 빠르게 성장하는 것 같아요! 대학교 전공수업을 보충하기 위해 토폴라를 수강하게 되었어요. 토폴라는 문제의 정답을 알려주기보다, 문제를 다양한.. 대학교 전공수업을 보충하기 위해 토폴라를 수강하게 되었어요. 토폴라는 문제의 정답을 알려주기보다, 문제를 다양한 관점에서 해석하고 스스로 해결할 수 있는 능력을 길러주어서
                                확실히 다른 교육보다 응용력이 더 빠르게 성장하는 것 같아요! 대학교 전공수업을 보충하기 위해 토폴라를 수강하게 되었어요. 토폴라는 문제의 정답을 알려주기보다, 문제를 다양한..
                            </LineBreak>
                        </Card>
                        <Card
                            width={"guide-col3"}
                            hideLine={0}
                        >
                            <div style={{display:'flex'}}>
                                <div>test1</div>
                                <div>test2</div>
                                <div>test3</div>
                            </div>
                            <div>
                                <div>test1</div>
                                <div>test2</div>
                                <div>test3</div>
                            </div>
                            <LineBreak>
                            대학교 전공수업을 보충하기 위해 대학교 전공수업을 보충하기 위해 
                            </LineBreak>
                        </Card>
                        <Card
                            width={"guide-col3"}
                            hideLine={2}
                            hideExtend
                        >
                            <div style={{display:'flex'}}>
                                <div>test1</div>
                                <div>test2</div>
                                <div>test3</div>
                            </div>
                            <div>
                                <div>test1</div>
                                <div>test2</div>
                                <div>test3</div>
                            </div>
                            <LineBreak className={'body-2'}>
                                대학교 전공수업을 보충하기 위해 토폴라를 수강하게 되었어요. 토폴라는 문제의 정답을 알려주기보다, 문제를 다양한 관점에서 해석하고 스스로 해결할 수 있는 능력을 길러주어서
                                대학교 전공수업을 보충하기 위해 토폴라를 수강하게 되었어요. 토폴라는 문제의 정답을 알려주기보다, 문제를 다양한 관점에서 해석하고 스스로 해결할 수 있는 능력을 길러주어서
                                확실히 다른 교육보다 응용력이 더 빠르게 성장하는 것 같아요! 대학교 전공수업을 보충하기 위해 토폴라를 수강하게 되었어요. 토폴라는 문제의 정답을 알려주기보다, 문제를 다양한.. 대학교 전공수업을 보충하기 위해 토폴라를 수강하게 되었어요. 토폴라는 문제의 정답을 알려주기보다, 문제를 다양한 관점에서 해석하고 스스로 해결할 수 있는 능력을 길러주어서
                                확실히 다른 교육보다 응용력이 더 빠르게 성장하는 것 같아요! 대학교 전공수업을 보충하기 위해 토폴라를 수강하게 되었어요. 토폴라는 문제의 정답을 알려주기보다, 문제를 다양한..
                            </LineBreak>
                        </Card>
                    </div>
                    :activeTab===3?
                    <div className='loader-container'>
                        <Loader
                            type='bounce'
                            color='tb'
                            style={{width:"300px", height: "300px", borderColor:"#000", borderWidth:"1px", borderStyle:"solid"}}
                        />
                        <Loader
                            type='bounce'
                            color='grey'
                            style={{width:"300px", height: "300px", borderColor:"#000", borderWidth:"1px", borderStyle:"solid"}}
                        />
                        <Loader
                            type="flash"
                            color="tb"
                            style={{width:"300px", height: "300px", borderColor:"#000", borderWidth:"1px", borderStyle:"solid"}}
                        />
                        <Loader
                            type="flash"
                            color="grey"
                            style={{width:"300px", height: "300px", borderColor:"#000", borderWidth:"1px", borderStyle:"solid"}}
                        />
                    </div>
                    :
                    null
                    }
                    
                </div>
                
            </div>

            <style jsx="true">{`
                .component-test {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .component-test > div {
                    margin: 10px;
                }

                .component-test-container > *{
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 20px;
                }

                .button-container, .checkbox-container, .dropdown-container, .textfield-container {
                    border: 1px solid #000;
                }

                .button-container>*, .checkbox-container>*, .dropdown-container>*, .textfield-container>* {
                    margin: 20px;
                }

                .card-container {
                    gap: 40px;
                }

                @media(min-width:800px) {
                    .button-container {
                        width: 1000px;
                    }
                    .card-container {
                        width: 1280px;
                    }

                    .component-test-container > *{
                        width: 1280px;
                    }
                }

                @media(max-width:800px) {
                    .component-test-container > *{
                        width: 320px;
                    }
                    .button-container {
                        width: 320px;
                    }
                    .card-container {
                        width: 320px;
                    }
                }
            `} </style>
        </>
    )
}

export default React.memo(ComponentTest);