import React, { useState, useEffect } from "react";
import { debugData } from "@/utils/debugData";
import { fetchNui } from "@/utils/fetchNui";
import { useNuiEvent } from "@/hooks/useNuiEvent";
import LibIcon from "@/components/LibIcon";
import { motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import './app.css'

debugData([
    {
        action: "showUi",
        data: [{
            face: "https://image.pollinations.ai/prompt/photo%20of%20a%20man%20face%20black%20hair%20beard%20medium%20skin%2025%20years%20old%20muslim",
            youhavecharacaters: false,


        }],
    },
]);



const App = () => {
    const [visible, setVisible] = useState(false);
    const [Hover, setHover] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState();
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [requestTxd, setRequestTxd] = useState(null);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        gender: "man",
        dateOfBirth: "",
        height: ""
    });

    useNuiEvent("showUi", (data) => {
        setVisible(true);
        if (data?.Face) {
            setRequestTxd(data.Face)
        }
    });






    return (
        <div className={`fixed inset-0 flex p-14   items-center justify-end  ${visible ? `shadow-[inset_0_20px_250px_170px_#131313]` : ``}`}>


            {visible && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            x: [0, -15, 0],
                            y: [0, 10, 0],
                            scale: [1, 1.02, 1]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { duration: 1.4 },
                            x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
                            y: { duration: 14, repeat: Infinity, ease: "easeInOut" },
                            scale: { duration: 16, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="w-full h-full absolute left-0 top-0 z-1 pattern-background pointer-events-none"
                    />
                    <div className="w-1/2 h-full py-36  flex items-end  justify-start flex-col gap-6 z-10 ">
                        <motion.div initial={{ y: 20, x: -20, opacity: 0 }} animate={{ y: 0, x: 0, opacity: 1 }} transition={{ duration: 0.5, type: 'spring', delay: 0.2 }} className="flex items-start justify-center  gap-2  ">
                            <p className="text-4xl font-bold text-white uppercase"> شخصية جديدة  </p>
                            <div className="text-white border-l-4 border-white text-2xl w-4 h-12 cursor-pointer" >  </div>
                        </motion.div>

                        <div className="w-full grid grid-cols-2  gap-10">
                            <motion.div initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, type: 'spring', delay: 0.2 }} className="relative w-full   group">
                                <input
                                    type="text"
                                    id="firstname"
                                    dir="rtl"
                                    placeholder=" "
                                    onChange={(e) => {
                                        setData(v => ({
                                            ...v,
                                            firstName: e.target.value
                                        }))
                                    }}
                                    className=" peer w-full text-2xl delay-300  h-14 bg-transparent text-white px-4 pt-5 pb-1 focus:border-b-4  hover:border-b-4 border-white outline-none transition-all duration-200  font-semibold tracking-wide text-right"
                                />
                                <label
                                    htmlFor="firstname"
                                    className="absolute right-4 peer-focus:text-2xl  text-2xl top-1/2 -translate-y-1/2 text-white font-bold tracking-wider   transition-all duration-200 pointer-events-nonegroup-hover:text-2xl  group-hover:-top-1.5 group-hover:translate-y-0   peer-focus:-top-1.5 peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:-top-1.5 peer-[:not(:placeholder-shown)]:translate-y-0 "
                                >
                                    الاسم الثاني
                                </label>
                            </motion.div>
                            <motion.div initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, type: 'spring', }} className="relative w-full  group">
                                <input
                                    type="text"
                                    id="firstname"
                                    dir="rtl"
                                    placeholder=" "
                                    onChange={(e) => {
                                        setData(v => ({
                                            ...v,
                                            lastName: e.target.value
                                        }))
                                    }}
                                    className=" peer w-full text-2xl delay-300  h-14 bg-transparent text-white px-4 pt-5 pb-1 focus:border-b-4  hover:border-b-4 border-white outline-none transition-all duration-200  font-semibold tracking-wide text-right"
                                />
                                <label
                                    htmlFor="firstname"
                                    className="absolute right-4 peer-focus:text-2xl  text-2xl top-1/2 -translate-y-1/2 text-white font-bold tracking-wider   transition-all duration-200 pointer-events-nonegroup-hover:text-2xl  group-hover:-top-1.5 group-hover:translate-y-0   peer-focus:-top-1.5 peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:-top-1.5 peer-[:not(:placeholder-shown)]:translate-y-0 "
                                >
                                    الاسم الاول
                                </label>
                            </motion.div>
                            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, type: 'spring', delay: 0.2 }} className="relative w-full  group">
                                <input
                                    type="text"
                                    id="firstname"
                                    dir="rtl"
                                    placeholder=" "
                                    className=" peer w-full text-2xl delay-300  h-14 bg-transparent text-white px-4 pt-5 pb-1 focus:border-b-4  hover:border-b-4 border-white outline-none transition-all duration-200  font-semibold tracking-wide text-right"
                                />
                                <label
                                    htmlFor="firstname"
                                    className="absolute right-4 peer-focus:text-2xl  text-2xl top-1/2 -translate-y-1/2 text-white font-bold tracking-wider   transition-all duration-200 pointer-events-nonegroup-hover:text-2xl  group-hover:-top-1.5 group-hover:translate-y-0   peer-focus:-top-1.5 peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:-top-1.5 peer-[:not(:placeholder-shown)]:translate-y-0 "
                                >
                                    الطول
                                </label>
                            </motion.div>

                            <div className="relative w-full">
                                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            dir="rtl"
                                            className="relative w-full h-14  bg-transparent text-white px-4 pt-5 pb-1 outline-none transition-all duration-200 font-semibold tracking-wide text-right flex items-center justify-between group cursor-pointer"
                                        >
                                            <span className={cn("text-2xl font-semibold", !data.dateOfBirth && "opacity-0")}>
                                                {data.dateOfBirth ? format(data.dateOfBirth, "yyyy/MM/dd") : "تاريخ الميلاد"}
                                            </span>
                                            <label
                                                className={cn(
                                                    "absolute right-4 text-2xl font-bold tracking-wider transition-all duration-200 pointer-events-none text-white",
                                                    data.dateOfBirth || calendarOpen
                                                        ? "-top-1.5 text-2xl translate-y-0"
                                                        : "top-1/2 -translate-y-1/2 group-hover:-top-1.5 group-hover:text-2xl group-hover:translate-y-0"
                                                )}
                                            >
                                                تاريخ الميلاد
                                            </label>
                                            <CalendarIcon className="size-6 text-white/80 group-hover:text-white transition-colors" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0 bg-neutral-900 border border-neutral-700 text-white shadow-2xl rounded-xl z-[9999]"
                                        align="end"
                                        sideOffset={8}
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={dateOfBirth}
                                            onSelect={(selectedDate) => {
                                                setData(v => {
                                                    return {
                                                        ...v,
                                                        dateOfBirth: selectedDate.toISOString().split("T")[0]
                                                    }
                                                })

                                            }}
                                            captionLayout="dropdown"
                                            startMonth={new Date(1940, 0)}
                                            endMonth={new Date()}
                                            initialFocus
                                            className="p-3 bg-neutral-900 text-white rounded-xl"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div
                                className="col-span-2 relative w-full h-16 p-1.5 rounded-2xl flex items-center justify-between"
                                data-glass="liquid"
                                data-glass-bezel="12"
                                data-glass-refraction="16"
                                data-glass-specular="0.4"
                                style={{
                                    background: "rgba(0, 0, 0, 0.45)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.5)"
                                }}
                            >
                                <div
                                    className="relative z-10 flex items-center justify-center h-full w-1/2 cursor-pointer select-none"
                                    onClick={() => {
                                        setData(v => ({
                                            ...v,
                                            gender: "man"
                                        }))
                                    }}
                                >
                                    {data.gender === "man" && (
                                        <motion.div
                                            layoutId="activeGenderGlass"
                                            className="absolute inset-0 rounded-xl"
                                            data-glass="liquid"
                                            data-glass-bezel="10"
                                            data-glass-refraction="14"
                                            data-glass-specular="1"
                                            style={{
                                                background: "rgba(0, 0, 0, 0.55)",
                                                border: "1px solid rgba(255, 255, 255, 0.12)",
                                                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 4px 20px rgba(0, 0, 0, 0.6)"
                                            }}
                                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                                        />
                                    )}
                                    <label className={`relative z-20 text-2xl font-bold cursor-pointer tracking-wider transition-colors duration-200 ${data.gender === "man" ? "text-white" : "text-white/40 hover:text-white/70"}`}>
                                        رجل
                                    </label>
                                </div>

                                <div
                                    className="relative z-10 flex items-center justify-center h-full w-1/2 cursor-pointer select-none"
                                    onClick={() => {
                                        setData(v => ({
                                            ...v,
                                            gender: "woman"
                                        }))
                                    }}
                                >
                                    {data.gender === "woman" && (
                                        <motion.div
                                            layoutId="activeGenderGlass"
                                            className="absolute inset-0 rounded-xl"
                                            data-glass="liquid"
                                            data-glass-bezel="10"
                                            data-glass-refraction="14"
                                            data-glass-specular="1"
                                            style={{
                                                background: "rgba(0, 0, 0, 0.55)",
                                                border: "1px solid rgba(255, 255, 255, 0.12)",
                                                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 4px 20px rgba(0, 0, 0, 0.6)"
                                            }}
                                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                                        />
                                    )}
                                    <label className={`relative z-20 text-2xl font-bold cursor-pointer tracking-wider transition-colors duration-200 ${data.gender === "woman" ? "text-white" : "text-white/40 hover:text-white/70"}`}>
                                        امرأة
                                    </label>
                                </div>
                            </div>


                        </div>




                    </div>
                    <motion.div className="w-[35vw] z-[1000]   h-[10vh] flex justify-center fixed bottom-0 right-0"
                        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, type: 'spring', delay: 0.6 }}
                        onHoverStart={() => {
                            setHover(true);
                        }}
                        onHoverEnd={() => {
                            setHover(false);
                        }}
                    >


                        <motion.div className="w-[30vw] h-[18vw] rounded-md  flex flex-col " style={{
                            backgroundImage: `url('card.jpg')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            transition: "all 0.5s ease-in-out",
                            backgroundBlendMode: "overlay",
                        }}
                            transition={{ duration: 0.4, ease: "circInOut", type: 'spring' }}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{
                                opacity: 1,

                                transform: Hover ? "rotateY(35deg) translateY(-400px)" : " translateY(20px)",
                            }}

                        >
                            <header className="relative flex items-center   z-10   justify-between px-4 py-2 flex-row-reverse w-full h-16" >
                                <div className="flex items-center justify-center text-[#499464] flex-col text-sm font-bold tracking-wider">
                                    المملكة العربية السعودية
                                    <span className=" font-[Amiri] text-base">وزارة الداخلية</span>
                                </div>
                                <img className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12  object-contain" src="saudilogo.png" alt="" />
                                <div className="flex items-center justify-center text-[#499464] flex-col text-sm font-bold tracking-wider">
                                    الهوية الوطنية
                                    <span className=" font-[Amiri] text-base">رقم النسخة : 1</span>
                                </div>
                            </header>
                            <div className="w-full   h-full flex items-center   justify-between">
                                {/* left */}
                                <div className="w-1/2 h-full flex items-center ml-5  flex-col justify-center p-3 gap-4  ">

                                    <img className="object-cover   w-[7vw] h-[8vw]" src={`https://nui-img/${requestTxd}`} alt="" />

                                    <span className=" text-4xl bg-white  libre-barcode-39" style={{ letterSpacing: '0.3rem' }}>
                                        2425254e
                                    </span>

                                </div>
                                <div className="w-1/2 h-full flex items-center justify-start px-8">

                                </div>

                                {/* right */}
                                <div className=" relative  w-full h-full b flex items-end justify-between flex-col p-3 gap-2 ">
                                    <span className="text-2xl tracking-wider text-black  font-[oi]">{data?.firstName + " " + data?.lastName}</span>
                                    <div className="flex flex-col  w-full h-1/2 justify-center items-end  gap-2 ">
                                        <span className="text-xl tracking-wider font-extrabold text-gray-900 ">الرقم : 347345342</span>
                                        <span className="text-xl tracking-wider font-extrabold text-gray-900 ">تاريخ الميلاد : {data?.dateOfBirth}</span>
                                        <span className="text-xl tracking-wider font-extrabold text-gray-900 ">الجنس : {data?.gender === "man" ? "ذكر" : "أنثى"}</span>
                                        <span className="text-xl tracking-wider font-extrabold text-gray-900 ">مكان الميلاد  : الرياض</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}

        </div>


    );
};

export default App;
