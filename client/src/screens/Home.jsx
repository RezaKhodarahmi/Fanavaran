import React,{useEffect} from 'react'
import { useTranslation } from "react-i18next";

export default function Home() {
const {t} = useTranslation();
  useEffect(() => {
    document.title = t('home-page')
 
  }, []);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h1>Home</h1>
        </div>
      </div>
    </div>
  )
}

<ul style="color:#000;font-size:17px;text-align:left;list-style:none" dir='ltr'>
  <li><a style="color:#fff;font-size:17px" href="https://fanavaran.ca/">Home</a></li>
  <li><a style="color:#fff;font-size:17px" href="https://fanavaran.ca/courses/">Courses</a></li>
  <li><a style="color:#fff;font-size:17px" href="https://fanavaran.ca/about-us/">About us</a></li>
  <li><a style="color:#fff;font-size:17px" href="https://fanavaran.ca/contact-us/">Contact us</a></li>
  <li><a style="color:#fff;font-size:17px" href="https://fanavaran.ca/blog/">blog</a></li>
  <li><a style="color:#fff;font-size:17px" href="https://fanavaran.ca/privacy-policy/">Privacy & Policy</a></li>


</ul>