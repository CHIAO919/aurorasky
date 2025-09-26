export default function SectionTitle({ children }) {
    return (
        <div className="flex items-center gap-4 my-8">
            <span className="h-px bg-main-gold flex-1"/>
            <h2 className="text-main-gold text-2xl font-extrabold tracking-wider text-shadow-xs">{ children }</h2>
            <span className="h-px bg-main-gold flex-1"/>
        </div>
    );
}