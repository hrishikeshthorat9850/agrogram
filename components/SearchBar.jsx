import { FaSearch } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
export default function SearchBar() {
  // const [search,setSearch] = useState("");
  // useEffect(()=>{
  //   const {data,error} = supabase.from("").
  // },[])
  return (
    <div className="max-w-md w-full mx-auto flex justify-center mb-4 p-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search posts, farmers, or tags..."
          className="w-full pl-12 pr-4 py-3 rounded-full border border-green-200 bg-white shadow focus:outline-none focus:ring-2 focus:ring-green-300 text-green-900 placeholder-green-400"
        />
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400 text-lg" />
      </div>
    </div>
  );
} 






