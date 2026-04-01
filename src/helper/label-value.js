export const LabelValue = ({ label, value }) => {
    return (
        <div style={{ display: "flex", marginBottom: 4 }}>
            <div style={{fontWeight: 600 }}>{label}:{" "}</div>
            <div style={{ marginLeft: 6 }}>{value ?? ""}</div>
        </div>
    );
};
