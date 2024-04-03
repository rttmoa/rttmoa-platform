import React from 'react'

interface SvgIconLibraryProps {
	svgFolder: string
}

// const SvgIconLibrary: React.FC<SvgIconLibraryProps> = ({ svgFolder }) => {
//   const req = require.context(svgFolder, false, /\.svg$/);
//   const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);

//   requireAll(req);

//   interface SvgIconProps {
//     icon: any;
//   }

//   const SvgIcon: React.FC<SvgIconProps> = ({ icon }) => {
//     const Icon = icon.default;
//     return <Icon />;
//   };

//   return (
//     <div>
//       {req.keys().map((key: string) => (
//         <SvgIcon key={key} icon={req(key)} />
//       ))}
//     </div>
//   );
// };

// export default SvgIconLibrary;
