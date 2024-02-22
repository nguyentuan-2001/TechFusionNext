import { TableForm } from "../molecules/Table";

export const CategoryForm = () => {
  const dataThead = ["No.", "Name", "Description", "Status", "Action"];
  const dataBody = [];

  dataBody.push(
    <tr>
      <td className="py-3 px-5 border-b border-[#bdbdbd]">
        <div className="flex items-center gap-4">
          <img
            src="/material-tailwind-dashboard-react/img/team-2.jpeg"
            alt="John Michael"
            className="inline-block relative object-cover object-center w-9 h-9 rounded-md"
          />
          <div>
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
              John Michael
            </p>
            <p className="block antialiased font-sans text-xs font-normal text-blue-gray-500">
              john@creative-tim.com
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 px-5 border-b border-[#bdbdbd]">
        <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
          Manager
        </p>
        <p className="block antialiased font-sans text-xs font-normal text-blue-gray-500">
          Organization
        </p>
      </td>
      <td className="py-3 px-5 border-b border-[#bdbdbd]">
        <div
          className="relative grid items-center font-sans uppercase whitespace-nowrap select-none bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-lg py-0.5 px-2  font-medium w-fit"
          data-projection-id="11"
          // style="opacity: 1;"
        >
          <span className="">online</span>
        </div>
      </td>
      <td className="py-3 px-5 border-b border-[#bdbdbd]">
        <p className="block antialiased font-sans text-xs font-semibold text-blue-gray-600">
          23/04/18
        </p>
      </td>
      <td className="py-3 px-5 border-b border-[#bdbdbd]">
        <a
          href="#"
          className="block antialiased font-sans text-xs font-semibold text-blue-gray-600"
        >
          Edit
        </a>
      </td>
    </tr>
  );
  return (
    <>
      <TableForm dataThead={dataThead} dataBody={dataBody} />
    </>
  );
};
