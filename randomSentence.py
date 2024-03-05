import matplotlib.pyplot as plt

# Assuming your array is named 'seq'
seq = [[[ 0.,          0.14399727,  0.04353815],
        [ 0.,          0.14117116, -0.3896423 ],
        [ 0.,         -0.0696298,  -0.7631114 ],
        [ 0.,         -0.24231018, -1.0992036 ],
        [ 0.,         -0.28806978, -1.2579755 ]]]

# Extract the values for plotting
x_values = [seq[0][i][1] for i in range(len(seq[0]))]
y_values = [seq[0][i][2] for i in range(len(seq[0]))]

# Plot the values
plt.plot(x_values, y_values, marker='o')
plt.xlabel('Values from Dimension 2')
plt.ylabel('Values from Dimension 3')
plt.title('Plot of [:,:,1][:,:,2]')
plt.grid(True)
plt.show()
